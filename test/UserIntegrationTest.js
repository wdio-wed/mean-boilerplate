var hippie = require('hippie');
var expect = require('chai').expect;
var server = require('./../routes/api/0.1/userAPI');

var userDAO = require('./../model/DAO/userDAO');

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
            hippie()
            .json()
            .send(user1)
            .post('http://localhost:8000/api/0.1/user/')
            .expectStatus(201)
            .end(function(err, res, body) {
                user1._id = body.data._id;
                if (err) throw err;
                done();
            });
        });
    });

    describe('POST /users/', function () {
        it('tries to create a duplicated user', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .send(user1)
            .post('http://localhost:8000/api/0.1/user/')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });
/*
    describe('POST /users/', function () {
        it('tries to create an invalid user', function (done) {
            this.timeout(10000);
            hippie()
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
    describe('GET /users/', function () {
        it('returns all users', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .get('http://localhost:8000/api/0.1/user/')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /users/:id', function () {
        it('returns a user based on the id', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .get('http://localhost:8000/api/0.1/user/56e04bd195d9b21ca8062d27')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /users/:id', function () {
        it('tries to read user with non-existing id', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .get('http://localhost:8000/api/0.1/user/nonvalidid')
            .expectStatus(404)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('UPDATE /users/:id', function () {
        it('updates user', function (done) {
            this.timeout(10000);
            user2.username = 'foo';
            hippie()
            .json()
            .send(user2)
            .method('PUT')
            .url('http://localhost:8000/api/0.1/user/'+user2._id)
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                expect(body.data.username).to.eql('foo');
                done();
            });
        });
    });

    describe('UPDATE /users/:id', function () {
        it('updates user with invalid username', function (done) {
            this.timeout(10000);
            user2.username = undefined;
            hippie()
            .json()
            .send(user2)
            .method('PUT')
            .url('http://localhost:8000/api/0.1/user/'+user2._id)
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('UPDATE /users/:id', function () {
        it('updates non-existing user', function (done) {
            this.timeout(10000);
            user2.username = 'foo';
            hippie()
            .json()
            .send(user2)
            .method('PUT')
            .url('http://localhost:8000/api/0.1/user/nonvalidid')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('POST /users/login', function () {
        it('tries to login a user', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .send(user1)
            .post('http://localhost:8000/api/0.1/user/login')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('DELETE /users/:id', function () {
        it('deletes user', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .method('DELETE')
            .url('http://localhost:8000/api/0.1/user/'+user2._id)
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('DELETE /users/:id', function () {
        it('deletes non-existing user', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .method('DELETE')
            .url('http://localhost:8000/api/0.1/user/nonvalidid')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });
});
