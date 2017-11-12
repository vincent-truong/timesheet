//users

//load
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define schema for user model

var userSchema = mongoose.Schema({
    local : {
        name : String,
        password: String,
    }
})

//check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
