// require all the functions for animal data manipulation from the module
const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

// get route queries
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// get route single animal
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post route
router.post('/animals', (req, res) => {
    // incoming content will be in req.body
    // set id based on the next available index in the animals arr
    // toString() because we JSON only takes strings
    req.body.id = animals.length.toString();

    // validate req.body, if incorrect send 400 error
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);

        res.json(animal);
    }
});

module.exports = router;