import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';
import { GlobalExceptionFilter } from '@/filters/globalException';
import { PrismaExceptionFilter } from '@/filters/prismaExceptionFilter';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { StorageService } from '@/common/storage.service';
import { ValidationPipe } from '@nestjs/common';

export const defaultStorageMock = {
  uploadFile: jest.fn().mockResolvedValue('https://cdn.local/test-image.png'),
  uploadManyFiles: jest.fn().mockResolvedValue(['https://cdn.local/test-image.png']),
};

export async function bootstrapTestApp(options?: { storageMock?: any }) {
  const builder = Test.createTestingModule({ imports: [AppModule] });

  const moduleRef = options?.storageMock
    ? await builder.overrideProvider(StorageService).useValue(options.storageMock).compile()
    : await builder.compile();

  const app = moduleRef.createNestApplication({ logger: ['error', 'warn', 'log', 'debug'] });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaExceptionFilter());

  const prisma = app.get(PrismaService);
  const jwtService = app.get(JwtService);

  await app.init();

  const accessToken = await jwtService.signAsync({ sub: 'e2e-user', email: 'e2e@portfolio.local' });

  return { app, prisma, accessToken, moduleRef };
}

export async function closeTestApp(app: INestApplication, prisma: PrismaService) {
  await prisma.$disconnect();
  await app.close();
}

export async function seedTypeSkills(prisma: PrismaService) {
  await prisma.typeSkills.upsert({
    where: { type: 'portfolio' },
    update: {},
    create: { type: 'portfolio' },
  });
}