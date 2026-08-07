import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from 'supertest';
import { ResponseInterceptor } from "@/interceptor/response.interceptor";
import { JwtService } from "@nestjs/jwt";
import { StorageService } from "@/common/storage.service";
import { GlobalExceptionFilter } from "@/filters/globalException";
import { PrismaExceptionFilter } from "@/filters/prismaExceptionFilter";

let app: INestApplication;
let prisma: PrismaService;
let accessToken: string;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(StorageService)
    .useValue({
      uploadFile: jest.fn().mockResolvedValue('https://cdn.local/test-image.png'),
    })
    .compile();

app = module.createNestApplication({
  logger: ['error', 'warn', 'log', 'debug'],
});
app.useGlobalInterceptors(new ResponseInterceptor());
app.useGlobalFilters(new GlobalExceptionFilter(), new PrismaExceptionFilter());
    prisma = app.get(PrismaService);
    const jwtService = app.get(JwtService);
    accessToken = await jwtService.signAsync({
      sub: 'e2e-user',
      email: 'e2e@portfolio.local',
    });

  await app.init();
});

afterAll(async () => {
  await prisma.$disconnect();
  await app.close();
});

beforeEach(async () => {
  await prisma.typeSkills.upsert({
    where: { type: 'portfolio' },
    update: {},
    create: { type: 'portfolio' },
  });

  await prisma.skills.deleteMany();
   await prisma.skills.create({
    data: {
      language: 'TypeScript',
      srcImg: 'img.png',
    },
  })
});

describe('GET /skills', () => {

    it('should return 200 and a list of skills',async()=>{
    const response = await request(app.getHttpServer())
        .get('/skills').expect(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.data).toHaveLength(1);
        expect(response.body.data.page).toBe(1);
        expect(response.body.data.limit).toBe(10);
        expect(response.body.data.data[0]).toHaveProperty('language', 'TypeScript');
        expect(response.body.data.data[0]).toHaveProperty('srcImg', 'img.png');
    })
});

describe('POST /skills', () => {
    it('should return 201 and create a new skill', async () => {
        const response = await request(app.getHttpServer())
            .post('/skills')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('language', 'JavaScript')
      .field('idType', 'portfolio')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')
            .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('language', 'JavaScript');
        expect(response.body.data).toHaveProperty('srcImg');
    })
  
    it('should return 409 if skill already exists', async () => {
        const response = await request(app.getHttpServer())
            .post('/skills')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('language', 'TypeScript')
      .field('idType', 'portfolio')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')
            .expect(409);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Skill with language TypeScript already exists');
    })

    it('should return 401 if no access token is provided', async () => {
        const response = await request(app.getHttpServer())
            .post('/skills')
      .field('language', 'JavaScript1')
      .field('idType', 'portfolio')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')
            .expect(401);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Unauthorized');
    }
  )
  });

  describe('GET /skills/:id', () => {
    it('should return 200 and the skill with the given ID', async () => {
      const skill = await prisma.skills.findFirst();
      const response = await request(app.getHttpServer())
        .get(`/skills/${skill!.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('language', skill!.language);
      expect(response.body.data).toHaveProperty('srcImg', skill!.srcImg);
    })
  
    it('should return 404 if skill with the given ID does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/skills/9999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Skill 9999 not found');
    }
  )
  
  });

  describe('PUT /skills/:id', () => {
    it('should return 200 and update the skill with the given ID', async () => {
      const skill = await prisma.skills.findFirst();
      const response = await request(app.getHttpServer())
        .put(`/skills/${skill!.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('language', 'UpdatedLanguage')
        .attach('file', Buffer.from('fake image content'), 'test-image.png')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('language', 'UpdatedLanguage');
      expect(response.body.data).toHaveProperty('srcImg');
    })

    it('should return 404 if skill with the given ID does not exist', async () => {
      const response = await request(app.getHttpServer())
        .put('/skills/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('language', 'UpdatedLanguage')
        .attach('file', Buffer.from('fake image content'), 'test-image.png')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Skill 9999 not found');
    })

    it('should return 401 if no access token is provided', async () => {
      const skill = await prisma.skills.findFirst();
      const response = await request(app.getHttpServer())
        .put(`/skills/${skill!.id}`)
        .field('language', 'UpdatedLanguage')
        .attach('file', Buffer.from('fake image content'), 'test-image.png')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Unauthorized');
    })
  });

    describe('DELETE /skills/:id', () => {
      it('should return 200 and delete the skill with the given ID', async () => {
        const skill = await prisma.skills.findFirst();
        const response = await request(app.getHttpServer())
          .delete(`/skills/${skill!.id}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
      })

      it('should return 404 if skill with the given ID does not exist', async () => {
        const response = await request(app.getHttpServer())
          .delete('/skills/9999')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Skill 9999 not found');
      })
    })

