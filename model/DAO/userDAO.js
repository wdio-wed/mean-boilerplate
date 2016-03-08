var db = require('../../config/mongodb').init(),
    mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
});

//Set up schema
var UserModel = db.model('User', UserSchema);

//READ all fruits
function loginUser(user, callbacks){
    return UserModel.find({'username': user.username }, function (err, u) {
        if (!err) {
            if(u[0]){
                if (u[0].password == user.password){
                    //Login ok
                    callbacks.success(u);
                }else{
                    //Password mismatch
                    callbacks.error('Invalid login parameters');
                }
            }else{
                //User does not exist
                callbacks.error('Invalid login parameters');
            }
        } else {
            callbacks.error(err);
        }
    });
}

module.exports.loginUser = loginUser;
