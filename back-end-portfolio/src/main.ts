import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config=new DocumentBuilder()
  .setTitle('Portfolio Api')
  .setDescription('API CRUD de mon portfolio')
  .setVersion('1.0')
  .addTag('Portfolio')
  .build()

  const documentFactory=()=>SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,documentFactory)
  const port = process.env.PORT || 8080;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Application en cours d'exécution sur le port ${port}`);
}

bootstrap();
