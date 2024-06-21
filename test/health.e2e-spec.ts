import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from './../src/model/dummy.entity';
import * as request from 'supertest';
import { DbHealthModule } from './../src/module/dummy.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { postgresContainer } from './utils/postgres.container';

describe('DbHealthController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let container: StartedPostgreSqlContainer;
  jest.setTimeout(60000);

  beforeAll(async () => {
    container = await postgresContainer();

    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return {
              type: 'postgres',
              url: container.getConnectionUri(),
              entities: [Dummy],
              synchronize: true,
            };
          },
        }),

        DbHealthModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await module.close();
    if (container) {
      await container.stop();
    }
  });

  it('/health/db (GET)', () => {
    return request(app.getHttpServer())
      .get('/health/db')
      .expect(200)
      .expect('OK');
  });
});
