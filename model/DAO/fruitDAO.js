var db = require('../../config/mongodb').init(),
    mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FruitSchema = new Schema({
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    price: { type: Number },
    modified: { type: Date, default: Date.now }
});
var FruitModel = db.model('Fruit', FruitSchema);

//READ all fruits
function readFruits(callbacks){
    return FruitModel.find(function (err, fruits) {
        if (!err) {
            console.log("[GET]   Get all fruits: " + JSON.stringify(fruits));
            callbacks.success(fruits);
            //return res.send(products);
        } else {
            console.log(err);
            callbacks.error(err);
        }
    });
}

//READ fruit by id
function readFruitById(id, callbacks){
    return FruitModel.findById(id, function (err, fruit) {
        if (!err) {
            console.log("[GET]   Get fruit: " + JSON.stringify(fruit));
            callbacks.success(fruit);
        } else {
            console.log(err);
            callbacks.error(err);
        }
    });
}

//CREATE fruit function
function createFruit(fruit, callbacks){
    fruit = new FruitModel({
        name: fruit.name,
        description: fruit.description,
        price: fruit.price
    });

    fruit.save(function (err) {
        if (!err) {
            console.log("[ADD]   Fruit created with name: " + fruit.name);
            callbacks.success();
        } else {
            console.log(err);
            callbacks.error(err);
        }
    });
}

//UPDATE fruit
function updateFruit(id, fruit, callbacks){
    return FruitModel.findById(id, function (err, f) {
        f.name = fruit.name;
        f.description = fruit.description;
        f.price = fruit.price;
        return f.save(function (err) {
            if (!err) {
                console.log("[UDP]   Updated fruit: " + JSON.stringify(f));
                callbacks.success(f);
            } else {
                console.log(err);
                callbacks.error(err);
            }
        });
    });
}

//DELETE fruit
function deleteFruit(id, callbacks){
    return FruitModel.findById(id, function (err, fruit) {
        return fruit.remove(function (err) {
            if (!err) {
                console.log("[DEL]    Deleted fruit: " + id);
                callbacks.success();
            } else {
                console.log(err);
                callbacks.error(err);
            }
        });
    });
}

module.exports.createFruit = createFruit;
module.exports.readFruits = readFruits;
module.exports.readFruitById = readFruitById;
module.exports.updateFruit = updateFruit;
module.exports.deleteFruit = deleteFruit;
