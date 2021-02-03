var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory')
const Cube = require('../models/cube');


/* GET details listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    Cube.findOne({_id: id}).populate('accessories')
    .then((thisCube) => {
      res.render('details', { title: 'Cubicle', cube: thisCube, accessories: thisCube.accessories, isCreator: true, loggedInUser: req.user});
  });
});

module.exports = router;
