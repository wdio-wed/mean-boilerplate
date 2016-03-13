var hippie = require('hippie');
var expect = require('chai').expect;

var fruitDAO = require('./../model/DAO/fruitDAO');

describe('FruitService', function () {
    var fruit1 = {
        name:           'Coconut_test',
        description:    'Brown',
        price:          800
    };
    var fruit2 = {
        name:           'Watermelon_test',
        description:    'Green',
        price:          200
    };

    before(function(done) {
        this.timeout(10000);
        fruitDAO.createFruit(fruit2, {
            success: function(f){
                expect(f.name).to.eql(fruit2.name);
                expect(f.description).to.eql(fruit2.description);
                expect(f.price).to.eql(fruit2.price);

                fruit2._id = f._id;
                done();
            },
            error: function(err){
                done(err);
            }
        });
    });

    after(function(done){
        this.timeout(10000);
        fruitDAO.deleteFruit(fruit1._id ,{
            success: function(){
                done();
            },
            error: function(err){
            }
        });
    });

    describe('POST /fruit/', function () {
        it('creates a new fruit', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .send(fruit1)
            .post('http://localhost:8000/api/0.1/fruit/')
            .expectStatus(201)
            .end(function(err, res, body) {
                fruit1._id = body.data._id;
                if (err) throw err;
                done();
            });
        });
    });

    describe('POST /fruit/', function () {
        it('tries to create a duplicated fruit', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .send(fruit1)
            .post('http://localhost:8000/api/0.1/fruit/')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /fruit/', function () {
        it('returns all fruits', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .get('http://localhost:8000/api/0.1/fruit/')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /fruit/:id', function () {
        it('returns a fruit based on the id', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .get('http://localhost:8000/api/0.1/fruit/'+fruit1._id)
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('GET /fruit/:id', function () {
        it('tries to read a fruit with non-existing id', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .get('http://localhost:8000/api/0.1/fruit/nonvalidid')
            .expectStatus(404)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('UPDATE /fruit/:id', function () {
        it('updates fruit', function (done) {
            this.timeout(10000);
            fruit2.price = 300;
            hippie()
            .json()
            .send(fruit2)
            .method('PUT')
            .url('http://localhost:8000/api/0.1/fruit/'+fruit2._id)
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                expect(body.data.price).to.eql(300);
                done();
            });
        });
    });

    describe('UPDATE /fruit/:id', function () {
        it('updates fruit with duplicated name', function (done) {
            this.timeout(10000);
            fruit2.name = fruit1.name;
            hippie()
            .json()
            .send(fruit2)
            .method('PUT')
            .url('http://localhost:8000/api/0.1/fruit/'+fruit2._id)
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('UPDATE /fruit/:id', function () {
        it('updates non-existing fruit', function (done) {
            this.timeout(10000);
            fruit2.price = 400;
            hippie()
            .json()
            .send(fruit2)
            .method('PUT')
            .url('http://localhost:8000/api/0.1/fruit/nonvalidid')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('DELETE /fruit/:id', function () {
        it('deletes fruit', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .method('DELETE')
            .url('http://localhost:8000/api/0.1/fruit/'+fruit2._id)
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });

    describe('DELETE /fruit/:id', function () {
        it('deletes non-existing fruit', function (done) {
            this.timeout(10000);
            hippie()
            .json()
            .method('DELETE')
            .url('http://localhost:8000/api/0.1/fruit/nonvalidid')
            .expectStatus(500)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
        });
    });
});
