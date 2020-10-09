const request = require('supertest');
const app = require('../../app');
const User = require('../models/user');

describe('Routes', () => {
  let user;
  beforeEach(async () => {
    await User.deleteMany({});
    user = { email: 'test@test.com', password: '123456' };
  });

  describe('POST /signup', () => {
    it('creates a new user', async (done) => {
      const res = await request(app).post('/signup').send(user);
      expect(res.statusCode).toEqual(201);
      done();
    });

    it('has property token in new user', async (done) => {
      const res = await request(app).post('/signup').send(user);
      expect(res.body).toHaveProperty('token');
      done();
    });

    it('must provide email and password', async (done) => {
      user = {};
      const res = await request(app).post('/signup').send(user);
      expect(res.statusCode).toEqual(422);
      done();
    });

    it('does not create user with existing email', async (done) => {
      await request(app).post('/signup').send(user);
      const res = await request(app).post('/signup').send(user);
      expect(res.statusCode).toEqual(422);
      done();
    });
  });

  describe('POST /signin', () => {
    it('logs in a user', async (done) => {
      await request(app).post('/signup').send(user);
      const res = await request(app).post('/signin').send(user);
      expect(res.statusCode).toEqual(200);
      done();
    });

    it('returns a token for successful login', async (done) => {
      await request(app).post('/signup').send(user);
      const res = await request(app).post('/signin').send(user);
      expect(res.body).toHaveProperty('token');
      done();
    });
  });

  describe('GET /', () => {
    it('blocks access from unauthorized token', async (done) => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(401);
      done();
    });

    it('logs in with valid token', async (done) => {
      const res = await request(app).post('/signup').send(user);
      const res2 = await request(app)
        .get('/')
        .set({ authorization: res.body.token });
      expect(res2.statusCode).toEqual(200);
      done();
    });
  });
});
