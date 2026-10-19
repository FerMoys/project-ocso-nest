import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });

  app.use(cookieParser());
  const config = new DocumentBuilder()
  .setTitle('Ocso API')
  .setDescription('API for ocso management')
  .setVersion('0.9')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.APP_PORT ?? 3003;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

await bootstrap();