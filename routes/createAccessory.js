var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('createAccessory', { title: 'Create Accessory', loggedInUser: req.user});
});

router.post('/', function(req, res, next) {     //works!
    console.log('create accessory post');
    console.log('~req', req.body);
    let data = req.body;

    let accessory = new Accessory({
        name: data.name, 
        imageUrl: data.imageUrl, 
        description: data.description, 
        cubes: []
    });
    accessory.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
    });
});

module.exports = router;
