import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/server/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
  it('/ (GET STORES)', () => {
    return request(app.getHttpServer())
      .get('/api/stores')
      .expect(200);
  });
  it('/ (GET STORES WITH QUERY PARAMS)', () => {
    return request(app.getHttpServer())
      .get('/api/stores?lat=56.83&lng=159.13')
      .expect(200);
  });
});
