//load
var mongoose = require('mongoose');
var Task = require('../app/models/task');
var TaskModel = mongoose.model('Task');

module.exports = function(app,passport) {
    //-----------------login-----------------
    //show login
    app.get('/', function (req, res) {
        //render the page
        res.render('index.ejs', {message: req.flash('loginMessage')})
    });

    //process login
    app.post('/', passport.authenticate('local-login', {
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
    app.get('/timesheet', isLoggedIn, function (req, res) {
        var path = require('path');
        res.sendFile(path.resolve('public/timesheet.html'));

    });

    ////-----------------Tasks list-----------------
    app.get('/tasks', function (req, res) {
        console.log(req.query.date);

        //find all tasks that pertain to selected calendar date
        TaskModel.find({'local.id': req.query.date}, function (err, result) {
            if (err) throw err;
            //Save the result into the response object and into mongodb
            res.json(result);
        });
    });

    app.post('/tasks', function (req, res) {
        //create model with required data
        var newTask = new Task();
        newTask.local.id = req.body.id;
        newTask.local.project = req.body.project;
        newTask.local.task = req.body.task;
        newTask.local.hours = req.body.hours;

        //save to mongodb
        newTask.save(function (err, result) {
            res.send(
                (err === null) ? {msg: ''} : {msg: err}
            );
        });

    });

    //---logout---
    app.get('/logout', function (req, res) {
        req.logout();
        res.resdirect('/');
    });


    //middleware to check if logged in
    function isLoggedIn(req, res, next) {
        //if user is authenticated in session
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }
};