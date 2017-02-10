const initialState = {
    firstAnimal : "Tiger"
};

export default (state = initialState, action) => {

    const newState = Object.assign({}, state);

    switch (action.type) {

        case 'SET_FIRST_ANIMAL':
            newState.firstAnimal = action.animal;
            break;


        case 'SET_ALL_ANIMALS':
            newState.firstColor = action.animals[0];
            break;

        default:
            return state;
    }

    return newState;

};