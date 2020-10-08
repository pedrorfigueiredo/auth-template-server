const request = require('supertest');
const app = require('../../app');
const User = require('../models/user');

describe('POST /', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('must provide email and password', async (done) => {
    const user = {};
    const res = await request(app).post('/').send(user);
    expect(res.statusCode).toEqual(422);
    done();
  });

  it('creates a new user', async (done) => {
    const user = { email: 'test@test.com', password: '123456' };
    const res = await request(app).post('/').send(user);
    expect(res.statusCode).toEqual(201);
    done();
  });

  it('does not create user with existing email', async (done) => {
    const user = { email: 'test@test.com', password: '123456' };
    await request(app).post('/').send(user);
    const res = await request(app).post('/').send(user);
    expect(res.statusCode).toEqual(422);
    done();
  });
});
