var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET edit listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);

    Cube.findOne({_id: id})//.populate('accessories')
    .then((thisCube) => {

        res.render('editCubePage', { title: 'Edit Cube Page', cube: thisCube, loggedInUser: req.user});
    });
});

router.post('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);

    Cube.updateOne(
        { _id: id },
        {
            "name": req.body.name,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl,
            "difficulty": req.body.difficultyLevel
        },
        (err) => console.log(err)
    );
    res.redirect('/');
})
module.exports = router;
