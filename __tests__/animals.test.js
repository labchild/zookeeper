const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require("../lib/animals");
const { animals } = require('../data/animals.json');

jest.mock('fs');

// test animal creation
test('creates an Animal obj', () => {
    const animal = createNewAnimal(
        { name: "Darlene", id: "1234d" },
        animals
    );

    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("1234d");
});

// test query filter
test('filters by query', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

// test find by id
test('returns single animal baed on id', () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const result = findById("3", startingAnimals);

    expect(result.name).toBe('Erica');
});

// test validation
test('validates personality traits', () => {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    };

    const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    };

    const validResult = validateAnimal(animal);
    const invalidResult = validateAnimal(invalidAnimal);

    expect(validResult).toBe(true);
    expect(invalidResult).toBe(false);
})