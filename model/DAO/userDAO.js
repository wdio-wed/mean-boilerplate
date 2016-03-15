var db = require('../../config/mongodb').init(),
    mongoose = require('mongoose');

var isInTest = typeof global.it === 'function';

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    created:    { type: Date,   default: Date.now },
    username:   { type: String, required: true, unique: true},
    password:   { type: String, required: true }
});

//Set up schema
var UserModel = db.model('User', UserSchema);

//READ all users
function readUsers(skip, count, callbacks){
    return UserModel.find()
    .skip(skip).limit(count).exec('find', function (err, users) {
        if (!err) {
            if(!isInTest) console.log("[GET]   Get all users: " + JSON.stringify(users));
            callbacks.success(users);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//READ user by id
function readUserById(id, callbacks){
    return UserModel.findById(id, function (err, user) {
        if (!err) {
            if(!isInTest) console.log("[GET]   Get user: " + JSON.stringify(user));
            callbacks.success(user);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//CREATE user function
function createUser(user, callbacks){
    var u = new UserModel({
        username:   user.username,
        password:   user.password
    });

    u.save(function (err) {
        if (!err) {
            if(!isInTest) console.log("[ADD]   User created with username: " + user.username);
            callbacks.success(u);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//UPDATE user
function updateUser(id, user, callbacks){
    return UserModel.findById(id, function (err, u) {
        if (!err) {
            u.username = user.username;
            u.password = user.password;
            return u.save(function (err) {
                if (!err) {
                    if(!isInTest) console.log("[UDP]   Updated user: " + JSON.stringify(u));
                    callbacks.success(u);
                } else {
                    if(!isInTest) console.log(err);
                    callbacks.error(err);
                }
            });
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }

    });
}

//DELETE user
function deleteUser(id, callbacks){
    return UserModel.findById(id, function (err, user) {
        return user.remove(function (err) {
            if (!err) {
                if(!isInTest) console.log("[DEL]    Deleted user: " + id);
                callbacks.success(user);
            } else {
                if(!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
    });
}

//Login user
function loginUser(user, callbacks){
    return UserModel.find({'username': user.username }, function (err, u) {
        if (!err) {
            if(u[0]){
                if (u[0].password == user.password){
                    //Login ok
                    callbacks.success(u[0]);
                }else{
                    //Password mismatch
                    callbacks.error({msg: 'Invalid login parameters', data: user});
                }
            }else{
                //User does not exist
                callbacks.error({msg: 'Invalid login parameters', data: user});
            }
        } else {
            callbacks.error(err);
        }
    });
}
module.exports.createUser = createUser;
module.exports.readUsers = readUsers;
module.exports.readUserById = readUserById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.loginUser = loginUser;
