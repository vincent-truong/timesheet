module.exports = function(app,passport) {
    //---login---
    //show login
    app.get('/login', function (req, res) {
        //render the page
        res.render('index.ejs', {message: req.flash('loginMessage')})
    });

    //process login
    // app.post('/login')

    //---signup---
    //show signup
    app.get('/signup', function (req, res) {
        //render the page
        res.render('signup.ejs', {message: req.flash('signupMessage')})
    });

    //process login
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/timesheet',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //--timesheet section---
    app.get('/timesheet', isLoggedIn, function (req, res) {
        //render
        res.render('timesheet.ejs', {
            user: req.user
        });
    });

    //---logout---
    app.get('/logout', function (req, res) {
        req.logout();
        res.resdirect('/login');
    });
};

//middleware to check if logged in
function isLoggedIn(req, res, next) {
    //if user is authenticated in session
    if (req.isAuthenticated())
        return next();
}

