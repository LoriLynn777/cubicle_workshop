var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Registration' });
});

router.post('/', function(req, res, next) {
    console.log('Register is working ', req.body.username);
    let tempUser = new User(req.body.username, req.body.password);
    tempUser.save().then((request) => {
        console.log("this is the req ", request);
        res.render('register', { title: 'Please register'});
    })
    
})

module.exports = router;
