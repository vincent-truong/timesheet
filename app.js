    //setup
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser')

    var app = express();
    var port = process.env.PORT || 3000;
    var mongoose = require('mongoose');
    var flash    = require('connect-flash');
    var passport = require('passport');
    var session = require('express-session');
    var path = require('path');

    //db
    var configDB = require('./config/database.js');
    mongoose.connect(configDB.url);
    require('./config/passport')(passport);

    // view engine setup
    app.set('view engine', 'ejs');

    //middleware
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('public'));



    //passport
    app.use(session({secret: 'secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    //routes
    require('./app/routes.js')(app, passport);


    // catch 404 and forward to error handler
    /*app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });*/

    // error handler
    /*app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });*/

    module.exports = app;

    //launch
    app.listen(port);
    console.log('Website starting on port ' + port);