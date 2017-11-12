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
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallBack: true
        },
        function(req, username, password, done) {
            //asynchronous
            process.nextTick(function(){
                ///find user whose name is same as one in form
               User.findOne({'local.name':username}, function(err,user){
                   //if errors, return error
                   if  (err)
                       return done(err);

                   //check to see if already user with that email
                   if (user){
                       return done(null, false, req.flash('signupMessage', 'That username is already taken'));
                   }else {
                       //if no user with that name
                        //create user
                       var newUser = new User();

                       //set credentials
                       newUser.local.name = username;
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
};