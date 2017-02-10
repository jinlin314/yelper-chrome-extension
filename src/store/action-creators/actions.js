export const setMammal = animal => {
    return {
        type: 'SET_MAMMAL',
        animal
    };
};


export const setAnimals = animals => {
    return {
        type: 'SET_ALL_ANIMALS',
        animals
    };
};