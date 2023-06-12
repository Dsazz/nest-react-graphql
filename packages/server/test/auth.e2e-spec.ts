import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@infrastructure/modules/app.module';
import { DataSource, Repository } from 'typeorm';
import { User } from '@domain/entities/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockHashGateway } from '@infrastructure/modules/gateways/MockHashGateway';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let connection: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('IHashGateway')
      .useClass(MockHashGateway)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );

    connection = userRepository.manager.connection;
  });

  beforeEach(async () => {
    await connection.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            register(user: { username: "testuser", email: "test@example.com", password: "testpassword" }) {
              id
              username
              email
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.register.username).toEqual('testuser');
    expect(response.body.data.register.email).toEqual('test@example.com');
  });

  it('should log in a user', async () => {
    // Create a test user and save it to the database
    const testUser = User.create({
      username: 'test',
      email: 'example@example.com',
      password: 'password123_true',
    });
    await userRepository.save(testUser);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(user: {
              email: "example@example.com",
              password: "password123_true"
            }) {
              id
              username
              email
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.login.id).toBeDefined();
  });
});
