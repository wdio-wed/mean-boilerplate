var expect = require('chai').expect,
    mongoose = require('mongoose'),
    db = require('./../config/mongodb').init(),
    fruitDAO = require('./../model/DAO/fruitDAO');

describe('FruitUnitTest', function() {
    var fruit1 = {
        name:           'Coconut_test',
        description:    'Brown',
        price:          800
    };
    var fruit2 = {
        name:           'Pear_test',
        description:    'Green',
        price:          200
    };

    before(function(done) {
        this.timeout(10000);
        fruitDAO.createFruit(fruit1, {
            success: function(f){
                expect(f.name).to.eql(fruit1.name);
                expect(f.description).to.eql(fruit1.description);
                expect(f.price).to.eql(fruit1.price);

                fruit1._id = f._id;
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

    it('#createFruit', function(done) {
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
                expect(err).to.be.null;
                done(err);
            }
        });
    });

    it('#createDuplicatedFruit', function(done) {
        this.timeout(10000);
        fruitDAO.createFruit(fruit2, {
            success: function(f){
                expect(f.name).to.eql(fruit2.name);
                expect(f.description).to.eql(fruit2.description);
                expect(f.price).to.eql(fruit2.price);
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });

    it('#readFruitById', function(done) {
        this.timeout(10000);
        fruitDAO.readFruitById(fruit1._id, {
            success: function(f){
                expect(f.name).to.eql(fruit1.name);
                expect(f.description).to.eql(fruit1.description);
                expect(f.price).to.eql(fruit1.price);
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#readNonExistingFruit', function(done) {
        this.timeout(10000);
        fruitDAO.readFruitById('-1', {
            success: function(f){
                expect.fail();
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });

    it('#updateFruit', function(done){
        this.timeout(10000);
        fruit1.price =  99;
        fruitDAO.updateFruit(fruit1._id, fruit1, {
            success: function(f){
                expect(f.price).to.eql(99);
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#partialUpdateFruit', function(done){
        this.timeout(10000);
        fruitDAO.updateFruit(fruit1._id, {price: 500}, {
            success: function(f){
                expect(f.price).to.eql(500);
                expect(f.name).to.eql(fruit1.name);
                expect(f.description).to.eql(fruit1.description);
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#updateNonExistingFruit', function(done){
        this.timeout(10000);
        fruit1.price =  99;
        fruitDAO.updateFruit('-1', fruit1, {
            success: function(f){
                expect.fail();
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });

    it('#deleteFruit', function(done) {
        this.timeout(10000);
        fruitDAO.deleteFruit(fruit2._id ,{
            success: function(){
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#deleteNonExistingFruit', function(done) {
        this.timeout(10000);
        fruitDAO.deleteFruit('-1' ,{
            success: function(){
                expect.fail();
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });
});
