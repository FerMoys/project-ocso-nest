
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { Location } from './entities/location.entity.js';
import { Manager } from '../managers/entities/manager.entity.js';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { manager: managerId, ...locationData } = createLocationDto;

    const location = this.locationRepository.create(locationData);

    if (managerId) {
      const manager = await this.managerRepository.findOne({
        where: { managerId },
      });

      if (!manager) {
        throw new NotFoundException('Manager not found');
      }

      if (manager.location) {
        throw new BadRequestException(
          'This manager is already assigned to another location',
        );
      }

      location.manager = manager;
    }

    return await this.locationRepository.save(location);
  }

  async findAll() {
    return await this.locationRepository.find({
      relations: {
        manager: true,
      },
    });
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({
      where: { locationId: id },
      relations: {
          manager: true,
        },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  
  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.findOne(id);

    const { manager: managerId, ...locationData } = updateLocationDto;

    // Actualizar los datos de la tienda.
    Object.assign(location, locationData);
    await this.locationRepository.save(location);

    if (managerId !== undefined) {
      // Buscar al gerente actualmente asociado a esta tienda.
      const previousManager = await this.managerRepository.findOne({
        where: {
          location: { locationId: id },
        },
        relations: {
          location: true,
        },
      });

      // Si se envía null, solo se desasocia al gerente.
      if (managerId === null) {
        if (previousManager) {
          previousManager.location = null;
          await this.managerRepository.save(previousManager);
        }
      } else {
        // Buscar al gerente solicitado.
        const manager = await this.managerRepository.findOne({
          where: { managerId },
          relations: {
            location: true,
          },
        });

        if (!manager) {
          throw new NotFoundException('Manager not found');
        }

        // No permitir que el gerente pertenezca a otra tienda.
        if (
          manager.location &&
          manager.location.locationId !== id
        ) {
          throw new BadRequestException(
            'This manager is already assigned to another location',
          );
        }

        // Liberar al gerente anterior si es diferente.
        if (
          previousManager &&
          previousManager.managerId !== manager.managerId
        ) {
          previousManager.location = null;
          await this.managerRepository.save(previousManager);
        }

        // Guardar la relación desde el lado propietario.
        manager.location = location;
        await this.managerRepository.save(manager);
      }
    }

    // Volver a consultar la tienda para devolver la relación actualizada.
    return await this.locationRepository.findOne({
      where: { locationId: id },
      relations: {
        manager: true,
      },
    });
  }


  async remove(id: number) {
    const location = await this.findOne(id);

    // Desvincular al gerente antes de eliminar la ubicación.
    await this.managerRepository
      .createQueryBuilder()
      .update(Manager)
      .set({ location: null })
      .where('locationId = :id', { id })
      .execute();

    return await this.locationRepository.delete({
      locationId: location.locationId,
    });
  }
}
