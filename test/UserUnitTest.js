var expect = require('chai').expect;

var mongoose = require('mongoose');

var db = require('./../config/mongodb').init();
var userDAO = require('./../model/DAO/userDAO');

describe('UserUnitTest', function() {
    var user1 = {
        username: 'user1@mail.com',
        password: 'pass1'
    };
    var user2 = {
        username: 'user2@mail.com',
        password: 'pass2'
    };


    before(function(done) {
        this.timeout(10000);
        userDAO.createUser(user1, {
            success: function(u){
                expect(u.username).to.eql('user1@mail.com');
                expect(u.password).to.eql('pass1');
                user1._id = u._id;
                done();
            },
            error: function(err){
                done(err);
            }
        });
    });

    after(function(done){
        var done1, done2;
        done2 = true;
        function finish(){
            if(done1 && done2){
                done();
            }
        }
        this.timeout(10000);
        userDAO.deleteUser(user1._id ,{
            success: function(){
                done1 = true;
                finish();
            },
            error: function(err){
            }
        });
    });

    it('#createUser', function(done) {
        this.timeout(10000);
        userDAO.createUser(user2, {
            success: function(u){
                expect(u.username).to.eql(user2.username);
                expect(u.password).to.eql(user2.password);
                user2._id = u._id;
                done();
            },
            error: function(err){
                //console.error(err);
                //expect().fail;
                expect(err).to.be.null;
                done(err);
            }
        });
    });

    it('#createDuplicatedUser', function(done) {
        this.timeout(10000);
        userDAO.createUser(user2, {
            success: function(u){
                expect(u.username).to.eql(user2.username);
                expect(u.password).to.eql(user2.password);
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });

    it('#readUserById', function(done) {
        this.timeout(10000);
        userDAO.readUserById(user1._id, {
            success: function(u){
                expect(u.username).to.eql(user1.username);
                expect(u.password).to.eql(user1.password);
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#readNonExistingUser', function(done) {
        this.timeout(10000);
        userDAO.readUserById('-1', {
            success: function(u){
                expect(u.username).to.eql(user1.username);
                expect(u.password).to.eql(user1.password);
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });

    it('#updateUser', function(done){
        this.timeout(10000);
        user1.username = 'foo';
        userDAO.updateUser(user1._id, user1, {
            success: function(user){
                expect(user.username).to.eql('foo');
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#updateNonExistingUser', function(done){
        this.timeout(10000);
        user1.username = 'foo';
        userDAO.updateUser('-1', user1, {
            success: function(user){
                expect.fail();
                done();
            },
            error: function(err){
                expect(err).to.not.be.null;
                done();
            }
        });
    });

    it('#loginUser', function(done) {
        this.timeout(10000);
        userDAO.loginUser(user2,{
            success: function(u){
                expect(u.username).to.eql(user2.username);
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });

    it('#deleteUser', function(done) {
        this.timeout(10000);
        userDAO.deleteUser(user2._id ,{
            success: function(u){
                expect(u).to.not.be.null
                done();
            },
            error: function(err){
                expect(err).to.be.null;
                done();
            }
        });
    });
});
