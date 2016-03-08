var express = require('express'),
    router = express.Router(),
    domain = require('domain'),
    fruitDAO = require('../model/DAO/fruitDAO');

//CREATE a new fruit
router.post('/', function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        fruitDAO.createFruit({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            }, {
            success: function(e){
                res.status(201).send('Fruit created succesfully: '+req.body.name);
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//READ all fruits
router.get('/', function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        fruitDAO.readFruits({
            success: function(fruits){
                res.status(200).send(JSON.stringify(fruits));
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//READ fruit by id
router.get('/:id', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});

    });

    d.run(function(){
        fruitDAO.readFruitById(req.params.id ,{
            success: function(fruit){
                res.status(200).send(JSON.stringify(fruit));
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//UPDATE fruit
router.put('/:id', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        fruitDAO.updateFruit(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            }, {
            success: function(f){
                res.status(200).send('Fruit updated succesfully: '+JSON.stringify(f));
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//DELETE fruit
router.delete('/:id', function (req, res){
    var d = domain.create();
    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        fruitDAO.deleteFruit(req.params.id ,{
            success: function(){
                res.status(200).send('Fruit deleted succesfully: ' + req.params.id);
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

module.exports = router;
