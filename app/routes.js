//load
var Task = require('../app/models/task');
var mongoose = require('mongoose');
//var task = new Task();
//var taskSchema = task.
var TaskModel = mongoose.model('Task');

module.exports = function(app,passport) {
    //-----------------login-----------------
    //show login
    app.get('/', function (req, res) {
        //render the page
        res.render('index.ejs', {message: req.flash('loginMessage')})
    });

    //process login
     app.post('/', passport.authenticate('local-login',{
         successRedirect: '/timesheet',
         failureRedirect: '/',
         failureFlash: true
     }));



    //-----------------signup-----------------
    //show signup
    app.get('/signup', function (req, res) {
        //render the page
        res.render('signup.ejs', {message: req.flash('signupMessage')})
    });

    //process signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/timesheet',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //-----------------timesheet-----------------
    app.get('/timesheet', function(req, res) {
        var path = require('path');
        res.sendFile(path.resolve('public/timesheet.html'));
    });

    app.post('/timesheet', function(req,res){
       console.log("adding new task");
        var newTask = new Task();
        newTask.local.id = req.body.date;
        newTask.local.project=req.body.selectProject;
        newTask.local.task=req.body.selectPowerTask;
        newTask.local.hours=req.body.hours;

        newTask.save(function(err){
            if (err) return handleError(err);
        });

    });

    app.get('/tasks',function(req,res){
       console.log('Fetching tasks');
        //find all tasks
        TaskModel.find({}, function(err, result){
            if ( err ) throw err;
            //Save the result into the response object.
            res.json(result);
        });
    });

   /* //---logout---
    app.get('/logout', function (req, res) {
        req.logout();
        res.resdirect('/');
    });*/
};

//middleware to check if logged in
function isLoggedIn(req, res, next) {
    //if user is authenticated in session
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

