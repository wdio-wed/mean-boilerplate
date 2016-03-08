var express = require('express'),
    router = express.Router(),
    domain = require('domain'),
    userDAO = require('../model/DAO/userDAO');

//USER login
//curl -H "Content-Type: application/json" -X POST -d '{"username":"mobgen","password":"M0bg3n"}' http://localhost:8000/api/0.1/user/login
router.post('/login', function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });


    d.run(function(){
        userDAO.loginUser({
                username: req.body.username,
                password: req.body.password
            }, {
            success: function(f){
                res.status(200).send('Logged in succesfully: '+JSON.stringify(f));
            },
            error: function(err){
                res.status(403).send(err);
            }
        });
    });
});

module.exports = router;
