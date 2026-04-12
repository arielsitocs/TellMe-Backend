import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // Valida que los objetos contengan solo los datos contemplados en el DTO, si hay un atributo extra, no lo permite //
    whitelist: true
  }))

  // Se habilita CORS para aceptar peticiones del frontend local //
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  // Configuracion de swagger para documentar //
  const config = new DocumentBuilder()
    .setTitle('TellMe')
    .setDescription('TellMe API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
