//load
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

//expose function to app
module.exports = function(passport){
    //---passport session setup---

    //serialize user
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    //deserialize user
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });

    //---signup---

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'name',
        passwordField : 'password',
        passReqToCallback: true
        },
        function(req, name, password, done) {
            //asynchronous
            process.nextTick(function(){
                ///find user whose name is same as one in form
               User.findOne({'local.name':name}, function(err,user){
                   //if errors, return error
                   if  (err)
                       return done(err);

                   //check to see if already exists user with that name
                   if (user){
                       return done(null, false, req.flash('signupMessage', 'That username is already taken'));
                   }else {
                       //if no user with that name
                        //create user
                       var newUser = new User();

                       //set credentials
                       newUser.local.name = name;
                       newUser.local.password = password;

                       //save user
                       newUser.save(function(err){
                           if(err)
                               throw err;
                           return done(null, newUser);
                       });
                   }
               });
            });
        }));

    //---login---
    passport.use('local-login', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
        passReqToCallback: true
    },function(req, name, password, done){
        //check to see if account exists
        User.findOne({'local.name':name}, function(err,user){
            //if errors, return error
            if (err)
              return done(err);

            //if no user found, return message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'User not found.'));

            //if password wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong Password'));

            //otherwise, successful login
            return done(null,user);
        });
    }));
};