var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET search results page. */
router.get('/', function(req, res, next) {
    console.log('search get');
    let searchQuery = req.query;
    console.log('search text:', searchQuery.search);
    console.log('from', searchQuery.from, 'to', searchQuery.to);
    let min = searchQuery.from;
    let max = searchQuery.to;
    let text = searchQuery.search;       //.toLowerCase();

    if (text == '' && min == '' && max == '') {
            res.redirect('/');
    } else {

        if (min == '') {
            min = 1;
        } else if (min < 1) {
            min = 1;
        } else if (min > 6) {
            min = 6;
        }

        if (max == '') {
            max = 6;
        } else if (max < 1) {
            max = 1;
        } else if (max > 6) {
            max = 6;
        }
        
        //console.log('name:', text, 'from:', min, 'to:', max);
        Cube.find({'name': new RegExp(text, "i"), 'difficulty': {$gte: min, $lte: max}}) //
        .then((cubes) => {
            console.log(cubes);
            res.render('search', { title: 'Search Results', cube: cubes, loggedInUser: req.user });
        })
        .catch((err) => console.log(err));
    }
});

module.exports = router;
