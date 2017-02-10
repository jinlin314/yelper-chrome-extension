export const setFirst = animal => {
    return {
        type: 'SET_FIRST_ANIMAL',
        animal
    };
};


export const setAnimals = animals => {
    return {
        type: 'SET_ALL_ANIMALS',
        animals
    };
};