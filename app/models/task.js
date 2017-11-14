//task

//load
var mongoose = require('mongoose');

//define schema for task model
//where id is calendar date
var taskSchema = mongoose.Schema({
    local : {
        id : String,
        project: String,
        task: String,
        hours: String
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Task', taskSchema);
