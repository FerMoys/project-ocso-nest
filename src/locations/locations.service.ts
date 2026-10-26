
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
    const location = this.locationRepository.create(createLocationDto);
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

    // Actualizar los datos de la ubicación.
    Object.assign(location, locationData);

    // Si se especificó un gerente, actualizar la relación.
    if (managerId !== undefined) {
      // Liberar la ubicación del gerente que la tenía anteriormente.
      await this.managerRepository
        .createQueryBuilder()
        .update(Manager)
        .set({ location: null })
        .where('locationId = :id', { id })
        .execute();

      if (managerId !== null) {
        const manager = await this.managerRepository.findOne({
          where: { managerId: managerId },
        });

        if (!manager) {
          throw new NotFoundException('Manager not found');
        }

        // Evitar que un gerente quede asignado a otra ubicación.
        if (
          manager.location &&
          manager.location.locationId !== id
        ) {
          throw new BadRequestException(
            'This manager is already assigned to another location',
          );
        }

        manager.location = location;
        await this.managerRepository.save(manager);
      }
    }

    return await this.locationRepository.save(location);
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
