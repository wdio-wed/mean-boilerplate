var mongoose = require('mongoose');

//Set up MongoDb connection
function _init(){
    try{
        return mongoose.createConnection('mongodb://mobgen:M0bg3n@ds056688.mongolab.com:56688/MongoLab-a');
    }catch(err){
        console.log("No internet connection :(");
    }
};

module.exports.init = _init;
