import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    // 1. Cargar las variables del archivo .env a nivel global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configurar TypeORM mediante forRootAsync
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
        entities: [],
        synchronize: true,
      }),
    }),
    EmployeesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}