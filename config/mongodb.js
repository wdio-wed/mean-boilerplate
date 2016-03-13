var mongoose = require('mongoose');

//TEST DB
//mongodb://han_solo:chewbacca@ds011379.mlab.com:11379/mean-boilerplate

//PROD DB
//mongodb://han_solo:chewbacca@ds011419.mlab.com:11419/mean-boilerplate-test

//Set up MongoDb connection
function _init(){
    try{
        return mongoose.createConnection('mongodb://han_solo:chewbacca@ds011379.mlab.com:11379/mean-boilerplate');
        //return mongoose.createConnection('mongodb://han_solo:chewbacca@ds011419.mlab.com:11419/mean-boilerplate-test');
    }catch(err){
        console.log("No internet connection :(");
    }
};

module.exports.init = _init;
