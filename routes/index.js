var express = require('express');
var router = express.Router();
const passport = require('passport');
const Cube = require('../models/cube');
const User = require('../models/user');


/* GET homepage / "browse" */
router.get('/', function(req, res, next) {
    Cube.find()
    .then((response) => {
        res.render('index', { title: 'Cubicle', cube: response, loggedInUser: req.user });
    })
    .catch((err) => console.log(err));
});


/* GET "/register */
router.get('/register', function(req, res, next) {
    console.log('register page');
    res.render('register', { title: 'Register Page' });
    
});

router.post('/register', function(req, res) {
    if (req.body.password === req.body.repeatPassword) {
        console.log('passwords match');

        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                return res.render('register', { error: err.message });
            }

            passport.authenticate('local')(req, res, function () {
                req.session.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });

    } else {
        res.send('passwords do not match');
    }
});

/* GET login listing. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login Page', loggedInUser: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});


// LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// Ping
router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});


module.exports = router;
