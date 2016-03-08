var mongoose = require('mongoose');
var db = require('../../config/mongodb').init();

var Schema = mongoose.Schema;
var Fruit = new Schema({
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    price: { type: Number },
    modified: { type: Date, default: Date.now }
});
var User = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
});

module.exports.Fruit = Fruit;
module.exports.User = User;
