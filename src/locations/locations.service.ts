import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity.js';

@Injectable()
export class LocationsService {
  constructor(
    private locationRepository: Repository<Location>
  ){}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto)
  }

  findAll() {
    return this.locationRepository.find()
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId:id,
    })
    if(!location) throw new NotFoundException("Location not found")
    
    return location;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationRepository.preload({
      locationId:id,
      ...updateLocationDto,
    })
    return location;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId:id
    })
  }
}
