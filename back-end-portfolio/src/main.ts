import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';  
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function createNestApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addTag('Your API Tag')
    .build();

    const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.init();
  return app as NestExpressApplication; // Casting vers NestExpressApplication
}

export default async function handler(req, res) {
  const app = await createNestApp();
  app.getHttpAdapter().getInstance()(req, res); // Passe la requête et la réponse à NestJS
}

