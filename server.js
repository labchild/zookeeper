const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
    // make a personality traits arr just in case
    let personalityTraitsArr = [];
    // filteredResults are all before filtered
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // save queried traits as own arr
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArr = [query.personalityTraits];
        } else {
            personalityTraitsArr = query.personalityTraits;
        }
        
        /* Check the trait against each animal in the filteredResults array.
       Remember, it is initially a copy of the animalsArray,
       but here we're updating it for each trait in the .forEach() loop.
       For each trait being targeted by the filter, the filteredResults
       array will then contain only the entries that contain the trait,
       so at the end we'll have an array of animals that have every one 
       of the traits when the .forEach() loop is finished. */
    
        // loop through traits in personalityTraitsArr to check if animals have it
        personalityTraitsArr.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1)
        })

    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
})