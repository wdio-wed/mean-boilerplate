var hippie = require('hippie');
var expect = require('chai').expect;
var userDAO = require('./../model/DAO/userDAO');

var app = require('../app.js');
var request = require('supertest')(app);

describe('UserService', function () {
    var user1 = {
        username:"test@test.com",
        password:"pito"
    };

    var user2 = {
        username: 'test2@mail.com',
        password: 'pass2'
    };

    before(function(done) {
        this.timeout(10000);
        userDAO.createUser(user2, {
            success: function(u){
                expect(u.username).to.eql('test2@mail.com');
                expect(u.password).to.eql('pass2');
                user2._id = u._id;
                done();
            },
            error: function(err){
                done(err);
            }
        });
    });

    after(function(done){
        this.timeout(10000);
        userDAO.deleteUser(user1._id ,{
            success: function(){
                done();
            },
            error: function(err){
            }
        });
    });

    describe('POST /users/', function () {
        it('creates a new user', function (done) {
            this.timeout(10000);

            request
            .post('/api/0.1/user/')
            .send(user1)
            .expect(201)
            .end(function(err, res){
                if (err) throw err;
                    user1._id = res.body.data._id;
                done();
            });
        });
    });

    describe('POST /user/', function () {
        it('tries to create a duplicated user', function (done) {
            this.timeout(10000);

            request
            .post('/api/0.1/user/')
            .send(user1)
            .expect(500)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });
/*
    describe('POST /users/', function () {
        it('tries to create an invalid user', function (done) {
            this.timeout(10000);
            hippie(server)
            .json()
            .send(invalid_user)
            .post('http://localhost:8000/api/0.1/user/')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });
*/
    describe('GET /user/', function () {
        it('returns all users', function (done) {
            this.timeout(10000);

            request
            .get('/api/0.1/user/')
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /user/:id', function () {
        it('returns a user based on the id', function (done) {
            this.timeout(10000);

            request
            .get('/api/0.1/user/'+user1._id)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /users/:id', function () {
        it('tries to read user with non-existing id', function (done) {
            this.timeout(10000);

            request
            .get('/api/0.1/user/nonvalidid')
            .expect(404)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });

    describe('UPDATE /users/:id', function () {
        it('updates user', function (done) {
            this.timeout(10000);
            user2.username = 'foo';

            request
            .put('/api/0.1/user/'+user2._id)
            .send(user2)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                expect(res.body.data.username).to.eql('foo');
                done();
            });
        });
    });

    describe('UPDATE /users/:id', function () {
        it('updates user with invalid username', function (done) {
            this.timeout(10000);
            user2.username = undefined;

            request
            .put('/api/0.1/user/'+user2._id)
            .send(user2)
            .expect(500)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });

    describe('UPDATE /users/:id', function () {
        it('updates non-existing user', function (done) {
            this.timeout(10000);
            user2.username = 'foo';

            request
            .put('/api/0.1/user/nonvalidid')
            .send(user2)
            .expect(500)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });

    describe('POST /users/login', function () {
        it('tries to login a user', function (done) {
            this.timeout(10000);

            request
            .post('/api/0.1/user/login')
            .send(user1)
            .expect(200)
            .end(function(err, res){
                console.log(res.body.data);
                if (err) throw err;
                done();
            });
        });
    });

    describe('DELETE /users/:id', function () {
        it('deletes user', function (done) {
            this.timeout(10000);

            request
            .del('/api/0.1/user/'+user2._id)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });

    describe('DELETE /users/:id', function () {
        it('deletes non-existing user', function (done) {
            this.timeout(10000);

            request
            .del('/api/0.1/user/nonvalidid')
            .expect(500)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
        });
    });
});
