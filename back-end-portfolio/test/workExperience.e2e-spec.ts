import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { bootstrapTestApp, closeTestApp, defaultStorageMock } from "./e2e.setup";
import request from 'supertest';

let app: INestApplication;
let prisma: PrismaService;
let accessToken: string;

beforeAll(async () => {
  const res = await bootstrapTestApp({ storageMock: defaultStorageMock });
  app = res.app;
  prisma = res.prisma;
  accessToken = res.accessToken;
});

afterAll(async () => {
  await closeTestApp(app, prisma);
});

beforeEach(async () => {
  await prisma.workExperience.deleteMany();
  await prisma.workExperience.create({
    data: {
        nameCompany: 'Test workExperience',
        job: 'This is a test workExperience',
        content: 'This is the content of the test workExperience',
        srcImg: 'https://cdn.local/test-image.png',
        endDate: new Date('2023-01-01'),
        stack: [{ name: 'TypeScript', img: 'https://cdn.local/stack.png' }, { name: 'NestJS', img: 'https://cdn.local/stack.png' }],
        startDate : new Date('2022-01-01'),
        tasks: ['Task 1', 'Task 2'],
    },
  });
});

describe('GET /workExperience', () => {
    it('should return 200 and a list of workExperience',async()=>{
    const response = await request(app.getHttpServer())
        .get('/workExperience').expect(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.data).toHaveLength(1);
        expect(response.body.data.page).toBe(1);
        expect(response.body.data.limit).toBe(10);
        expect(response.body.data.data[0]).toHaveProperty('nameCompany', 'Test workExperience');
        expect(response.body.data.data[0]).toHaveProperty('job', 'This is a test workExperience');
        expect(response.body.data.data[0]).toHaveProperty('content', 'This is the content of the test workExperience');
        expect(response.body.data.data[0]).toHaveProperty('srcImg', 'https://cdn.local/test-image.png');
        expect(response.body.data.data[0]).toHaveProperty('endDate');
        expect(new Date(response.body.data.data[0].endDate)).toEqual(new Date('2023-01-01'));
        expect(response.body.data.data[0]).toHaveProperty('stack');
        expect(response.body.data.data[0].stack.map((s:any) => s.name)).toEqual(['TypeScript', 'NestJS']);
        expect(response.body.data.data[0]).toHaveProperty('startDate');
        expect(new Date(response.body.data.data[0].startDate)).toEqual(new Date('2022-01-01'));
        expect(response.body.data.data[0]).toHaveProperty('tasks');
        expect(response.body.data.data[0].tasks).toEqual(['Task 1', 'Task 2']);
    })
});

describe('POST /workExperience', () => {
    it('should return 201 and create a new workExperience', async () => {
        const response = await request(app.getHttpServer())
            .post('/workExperience').expect(201)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('nameCompany', 'New workExperience')
        .field('job', 'This is a new workExperience')
        .field('content', 'This is the content of the new workExperience')
        .field('endDate', '2024-01-01')
        .field('startDate', '2023-01-01')
        .field('stack', JSON.stringify([{ name: 'JavaScript', img: 'https://cdn.local/stack.png' }, { name: 'React', img: 'https://cdn.local/stack.png' }]))
        .field('tasks', JSON.stringify(['Task A', 'Task B']))
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('nameCompany', 'New workExperience');
        expect(response.body.data).toHaveProperty('job', 'This is a new workExperience');
        expect(response.body.data).toHaveProperty('content', 'This is the content of the new workExperience');
        expect(response.body.data).toHaveProperty('srcImg');
        expect(response.body.data).toHaveProperty('endDate');
        expect(new Date(response.body.data.endDate)).toEqual(new Date('2024-01-01'));
        expect(response.body.data).toHaveProperty('startDate');
        expect(new Date(response.body.data.startDate)).toEqual(new Date('2023-01-01'));
        expect(response.body.data).toHaveProperty('stack');
        expect(response.body.data.stack.map((s:any) => s.name)).toEqual(['JavaScript', 'React']);
        expect(response.body.data).toHaveProperty('tasks');
        expect(response.body.data.tasks).toEqual(['Task A', 'Task B']);
    })

    it('should return 409 if workExperience already exists', async () => {
        const response = await request(app.getHttpServer())
            .post('/workExperience').expect(409)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('nameCompany', 'Test workExperience')
        .field('job', 'This is a test workExperience')
        .field('content', 'This is the content of the test workExperience')
        .field('endDate', '2023-01-01')
        .field('startDate', '2022-01-01')
        .field('stack', JSON.stringify([{ name: 'TypeScript', img: 'https://cdn.local/stack.png' }, { name: 'NestJS', img: 'https://cdn.local/stack.png' }]))
        .field('tasks', JSON.stringify(['Task 1', 'Task 2']))
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })

    it('should return 401 if not authenticated', async () => {
        const response = await request(app.getHttpServer())
            .post('/workExperience').expect(401)
        .field('nameCompany', 'Unauthorized workExperience')
        .field('job', 'This workExperience should not be created')
        .field('content', 'This is the content of the unauthorized workExperience')
        .field('endDate', '2025-01-01')
        .field('startDate', '2024-01-01')
        .field('stack', JSON.stringify([{ name: 'Python', img: 'https://cdn.local/stack.png' }, { name: 'Django', img: 'https://cdn.local/stack.png' }]))
        .field('tasks', JSON.stringify(['Task X', 'Task Y']))
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })
})

describe('PUT /workExperience/:id', () => {
    it('should return 200 and update the workExperience', async () => {
        const workExperience = await prisma.workExperience.findFirst();
        const response = await request(app.getHttpServer())
            .put(`/workExperience/${workExperience!.id}`).expect(200)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('nameCompany', 'Updated workExperience')
        .field('job', 'This is an updated workExperience')
        .field('content', 'This is the updated content of the workExperience')
        .field('endDate', '2026-01-01')
        .field('startDate', '2025-01-01')
        .field('stack', JSON.stringify([{ name: 'Go', img: 'https://cdn.local/stack.png' }, { name: 'Gin', img: 'https://cdn.local/stack.png' }]))
        .field('tasks', JSON.stringify(['Task Updated A', 'Task Updated B']))
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('nameCompany', 'Updated workExperience');
        expect(response.body.data).toHaveProperty('job', 'This is an updated workExperience');
        expect(response.body.data).toHaveProperty('content', 'This is the updated content of the workExperience');
        expect(response.body.data).toHaveProperty('srcImg');
        expect(response.body.data).toHaveProperty('endDate');
        expect(new Date(response.body.data.endDate)).toEqual(new Date('2026-01-01'));
        expect(response.body.data).toHaveProperty('startDate');
        expect(new Date(response.body.data.startDate)).toEqual(new Date('2025-01-01'));
        expect(response.body.data).toHaveProperty('stack');
        expect(response.body.data.stack.map((s:any) => s.name)).toEqual(['Go', 'Gin']);
        expect(response.body.data).toHaveProperty('tasks');
        expect(response.body.data.tasks).toEqual(['Task Updated A', 'Task Updated B']);
    })

    it('should return 404 if workExperience does not exist', async () => {
        const response = await request(app.getHttpServer())
            .put('/workExperience/9999').expect(404)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('nameCompany', 'Non-existent workExperience')
        .field('job', 'This workExperience does not exist')
        .field('content', 'This is the content of the non-existent workExperience')
        .field('endDate', '2027-01-01')
        .field('startDate', '2026-01-01')
        .field('stack', JSON.stringify([{ name: 'Rust', img: 'https://cdn.local/stack.png' }, { name: 'Rocket', img: 'https://cdn.local/stack.png' }]))
        .field('tasks', JSON.stringify(['Task Non-existent A', 'Task Non-existent B']))
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })

    it('should return 401 if not authenticated', async () => {
        const workExperience = await prisma.workExperience.findFirst();
        const response = await request(app.getHttpServer())
            .put(`/workExperience/${workExperience!.id}`).expect(401)
        .field('nameCompany', 'Unauthorized update')
        .field('job', 'This update should not be allowed')
        .field('content', 'This is the content of the unauthorized update')
        .field('endDate', '2028-01-01')
        .field('startDate', '2027-01-01')
        .field('stack', JSON.stringify([{ name: 'Elixir', img: 'https://cdn.local/stack.png' }, { name: 'Phoenix', img: 'https://cdn.local/stack.png' }]))
        .field('tasks', JSON.stringify(['Task Unauthorized A', 'Task Unauthorized B']))
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })

})

describe('DELETE /workExperience/:id', () => {
    it('should return 200 and delete the workExperience', async () => {
        const workExperience = await prisma.workExperience.findFirst();
        const response = await request(app.getHttpServer())
            .delete(`/workExperience/${workExperience!.id}`).expect(200)
      .set('Authorization', `Bearer ${accessToken}`)

        expect(response.body.success).toBe(true);
    })

    it('should return 404 if workExperience does not exist', async () => {
        const response = await request(app.getHttpServer())
            .delete('/workExperience/9999').expect(404)
      .set('Authorization', `Bearer ${accessToken}`)

        expect(response.body.success).toBe(false)})
    
    it('should return 401 if not authenticated', async () => {
        const workExperience = await prisma.workExperience.findFirst();
        const response = await request(app.getHttpServer())
            .delete(`/workExperience/${workExperience!.id}`).expect(401)

        expect(response.body.success).toBe(false);
    })
})
