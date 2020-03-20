import { expect } from 'chai';
import request from 'supertest';
import app from '../';
import { db } from '../db';

describe('users endpoint', () => {
  const testUser = {
    name: 'Test user',
    email: 'testuser@gmail.com',
    password: 'test',
    token: ''
  };
  before(function() {
    // Ensure that the database has no users
    db.set('users', []).write();
  });

  it('should throw an error if an unregistered user tries to login', () => {
    request(app)
      .post('/api/v1/users/login')
      .send({ email: 'hello@email.com', password: 'hello' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.have.property('error');
      });
  });

  it('should successfully register a user', () => {
    request(app)
      .post('/api/v1/users/register')
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.have.property('data');
        expect(res.body.data.user).to.have.property('id');
        expect(res.body.data.user.name).to.equal(testUser.name);
        expect(res.body.data.user.email).to.equal(testUser.email);
      });
  });

  it('should successfully login a registered user', () => {
    request(app)
      .post('/api/v1/users/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.not.have.property('error');
        expect(res.body.data).to.have.property('user');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.user.name).to.equal(testUser.name);
        expect(res.body.data.user.email).to.equal(testUser.email);
        testUser.token = res.body.data.token;
      });
  });

  it('should return 404 for a non existent user', (done) => {
    request(app)
      .get('/api/v1/users/idontexist')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should not update a user\'s info without authorization', () => {
    const updatedUserData = {
      name: "New name"
    }
    request(app)
      .put('/api/v1/users/')
      .send(updatedUserData)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.body).to.have.property('error');
    })
  })

  it('should successfully update a user', () => {
    const updatedUserData = {
      name: "New name"
    }
    request(app)
      .put('/api/v1/users/')
      .set('authorization', `Bearer ${testUser.token}`)
      .send(updatedUserData)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.body).to.not.have.property('error');
        expect(res.body.data).to.have.property('user');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.user.name).to.equal(updatedUserData.name);

    })
  })
});
