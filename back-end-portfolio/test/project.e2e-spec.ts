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

  await prisma.project.deleteMany();
  await prisma.project.create({
    data: {
        name: 'Test Project',
        description: 'This is a test project',
        linkGithub: 'https://example.com',
                thumbnail: ['https://cdn.local/test-image.png'],
                year: new Date('2022-01-01'),
                stackImg: [{ name: 'Node', img: 'https://cdn.local/stack.png' }],
                nbCollaborator: 1,
        content: 'This is the content of the test project',
    },
  });
});

describe('GET /project', () => {
    it('should return 200 and a list of projects',async()=>{
    const response = await request(app.getHttpServer())
        .get('/project').expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.data).toHaveLength(1);
        expect(response.body.data.page).toBe(1);
        expect(response.body.data.limit).toBe(10);
        expect(response.body.data.data[0]).toHaveProperty('name', 'Test Project');
        expect(response.body.data.data[0]).toHaveProperty('description', 'This is a test project');
        expect(response.body.data.data[0]).toHaveProperty('linkGithub', 'https://example.com');
        expect(response.body.data.data[0]).toHaveProperty('thumbnail');
        expect(response.body.data.data[0].thumbnail[0]).toBe('https://cdn.local/test-image.png');
        expect(response.body.data.data[0]).toHaveProperty('content', 'This is the content of the test project');
    })
});

describe('POST /project', () => {
    it('should return 201 and create a new project', async () => {
        const response = await request(app.getHttpServer())
            .post('/project').expect(201)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'New Project')
        .field('description', 'This is a new project')
        .field('linkGithub', 'https://newproject.com')
        .field('year', '2023-01-01')
        .field('stackImg', JSON.stringify([{ name: 'JavaScript', img: 'https://cdn.local/stack.png' }]))
        .field('nbCollaborator', '2')
        .field('content', 'This is the content of the new project')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('name', 'New Project');
        expect(response.body.data).toHaveProperty('description', 'This is a new project');
        expect(response.body.data).toHaveProperty('linkGithub', 'https://newproject.com');
        expect(response.body.data).toHaveProperty('thumbnail');
        expect(response.body.data.thumbnail[0]).toBe('https://cdn.local/test-image.png');
        expect(response.body.data).toHaveProperty('content', 'This is the content of the new project');
    })

    it('should return 409 if project already exists', async () => {
        const response = await request(app.getHttpServer())
            .post('/project').expect(409)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('name', 'Test Project')
        .field('description', 'This is a test project')
        .field('linkGithub', 'https://example.com')
        .field('year', '2022-01-01')
        .field('stackImg', JSON.stringify([{ name: 'Node', img: 'https://cdn.local/stack.png' }]))
        .field('nbCollaborator', '1')
        .field('content', 'This is the content of the test project')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })

    it('should return 401 if not authenticated', async () => {
        const response = await request(app.getHttpServer())
            .post('/project').expect(401)
        .field('name', 'Unauthorized Project')
        .field('description', 'This project should not be created')
        .field('linkGithub', 'https://unauthorized.com')
        .field('year', '2024-01-01')
        .field('stackImg', JSON.stringify([{ name: 'Unauthorized', img: 'https://cdn.local/stack.png' }]))
        .field('nbCollaborator', '1')
        .field('content', 'This is the content of the unauthorized project')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })

})

describe('DELETE /project/:id', () => {
    it('should return 200 and delete the project', async () => {
        const project = await prisma.project.findFirst();
        const response = await request(app.getHttpServer())
            .delete(`/project/${project!.id}`).expect(200)
      .set('Authorization', `Bearer ${accessToken}`)

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('name', 'Test Project');
    })

    it('should return 404 if project does not exist', async () => {
        const response = await request(app.getHttpServer())
            .delete('/project/999').expect(404)
      .set('Authorization', `Bearer ${accessToken}`)
        expect(response.body.success).toBe(false);
    })

    it('should return 401 if not authenticated', async () => {
        const project = await prisma.project.findFirst();
        const response = await request(app.getHttpServer())
            .delete(`/project/${project!.id}`).expect(401)

        expect(response.body.success).toBe(false);
    })
})

describe('PUT /project/:id', () => {
    it('should return 200 and update the project', async () => {
        const project = await prisma.project.findFirst();
        const response = await request(app.getHttpServer())
            .put(`/project/${project!.id}`).expect(200)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Updated Project')
        .field('description', 'This is an updated project')
        .field('linkGithub', 'https://updatedproject.com')
                .field('year', '2024-01-01')
                .field('stackImg', JSON.stringify([{ name: 'Updated', img: 'https://cdn.local/stack.png' }]))
                .field('nbCollaborator', '3')
        .field('content', 'This is the updated content of the project')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('name', 'Updated Project');
        expect(response.body.data).toHaveProperty('description', 'This is an updated project');
        expect(response.body.data).toHaveProperty('linkGithub', 'https://updatedproject.com');
        expect(response.body.data).toHaveProperty('thumbnail');
        expect(response.body.data.thumbnail[0]).toBe('https://cdn.local/test-image.png');
        expect(response.body.data).toHaveProperty('content', 'This is the updated content of the project');
    })

    it('should return 404 if project does not exist', async () => {
        const response = await request(app.getHttpServer())
            .put('/project/999').expect(404)
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Updated Project')
        .field('description', 'This is an updated project')
        .field('linkGithub', 'https://updatedproject.com')
                .field('year', '2024-01-01')
                .field('stackImg', JSON.stringify([{ name: 'Updated', img: 'https://cdn.local/stack.png' }]))
                .field('nbCollaborator', '3')
        .field('content', 'This is the updated content of the project')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })

    it('should return 401 if not authenticated', async () => {
        const project = await prisma.project.findFirst();
        const response = await request(app.getHttpServer())
            .put(`/project/${project!.id}`).expect(401)
      .field('name', 'Updated Project')
        .field('description', 'This is an updated project')
        .field('linkGithub', 'https://updatedproject.com')
                .field('year', '2024-01-01')
                .field('stackImg', JSON.stringify([{ name: 'Updated', img: 'https://cdn.local/stack.png' }]))
                .field('nbCollaborator', '3')
        .field('content', 'This is the updated content of the project')
            .attach('file', Buffer.from('fake image content'), 'test-image.png')

        expect(response.body.success).toBe(false);
    })
})






