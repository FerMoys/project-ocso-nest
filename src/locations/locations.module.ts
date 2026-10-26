import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service.js';
import { LocationsController } from './locations.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity.js';
import { ManagersModule } from '../managers/managers.module.js';
import { Manager } from '../managers/entities/manager.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Manager]), ManagersModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
