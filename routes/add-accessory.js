var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('add a accessory');
    res.render('create_accessory', { title: 'Add an accessory ' })
});

router.post('/', function(req, res, next) {
    const newCube = new Cube({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    level: req.body.difficultyLevel,
    });
    
    newCube.save()
    .then((result) => {
        console.log(result)
        res.redirect('/')
    })
    .catch((err) => {
        res.send(err)
    })
})

module.exports = router;
