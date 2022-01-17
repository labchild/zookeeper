const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

// test zookeeper creation
test('creates zookeeper obj', () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "1234d" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("1234d");
});

// test query filter
test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",

        }
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "bear" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

// test to find by id
test('returns a single zookeeper based on id', () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",

        }
    ];

    const result = findById("2", startingZookeepers);

    expect(result.name).toBe("Raksha");
});

// test validation
test('validates age', () => {
    const validZookeeper = {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    };

    const invalidZookeeper = {
        id: "2",
        name: "Raksha",
        favoriteAnimal: "penguin"
    };

    const validResult = validateZookeeper(validZookeeper);
    const invalidResult = validateZookeeper(invalidZookeeper);

    expect(validResult).toBe(true);
    expect(invalidResult).toBe(false);
});