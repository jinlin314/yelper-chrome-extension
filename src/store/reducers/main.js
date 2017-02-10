const initialState = {
    firstAnimal : "Tiger"
};

export default (state = initialState, action) => {

    const newState = Object.assign({}, state);

    switch (action.type) {

        case 'SET_MAMMAL':
            newState.mammal = action.animal;
            break;


        default:
            return state;
    }

    return newState;

};