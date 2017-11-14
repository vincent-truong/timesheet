module.exports = function(app,passport) {
    //---login---
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



    //---signup---
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

    //--timesheet section---
    app.get('/timesheet', function(req, res) {
        var path = require('path');
        res.sendFile(path.resolve('public/timesheet.html'));
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

