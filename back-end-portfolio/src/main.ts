import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';  // Import de NestExpressApplication

export async function createNestApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();
  return app as NestExpressApplication; // Casting vers NestExpressApplication
}

export default async function handler(req, res) {
  const app = await createNestApp();
  app.getHttpAdapter().getInstance()(req, res); // Passe la requête et la réponse à NestJS
}

