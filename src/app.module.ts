import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';
import { Product } from './products/entities/product.entity.js';
import { Employee } from './employees/entities/employee.entity.js';
import { ProvidersModule } from './providers/providers.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RegionsModule } from './regions/regions.module.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './auth/constants/jwt.constants.js';
import { EXPIRES_IN } from './auth/constants/jwt.constants.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('host') ?? 'localhost',
        port: configService.get<number>('port') ?? 5432,
        username: 'postgres',
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
  ],
})
export class AppModule {}