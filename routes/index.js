var express = require('express'),
    router = express.Router(),
    domain = require('domain');

// GET index
router.get('/', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });


    d.run(function(){
        res.render('index', { title: 'fruit manager'});
    });
});

module.exports = router;
