var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    Cube.findOne({_id: id})//.populate('accessories')
    .then((thisCube) => {
        res.render('deleteCubePage', { title: 'Delete Cube Page', cube: thisCube, isCreator: true, loggedInUser: req.user});
    });
    
});

router.post('/:uid', function(req, res, next) {
    console.log('testing post');
    let cubeId = req.params.uid;
    console.log('deleting this', cubeId);    //works

    Accessory.updateMany(
        { "cubes": cubeId },
        { $pull: {"cubes": cubeId}}, 
        function(err, accs) {
            if (err) console.log(err);
            else console.log('Updated accessories:', accs);
        }
    );

    Cube.deleteOne({_id: cubeId})
    .then(function() {console.log('Deleted cube with id', cubeId);})
    .catch(function(err) {console.log(err);});

    res.redirect('/');
});

module.exports = router;
