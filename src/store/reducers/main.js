const initialState = {
    mammal : "Tiger",
    bird : "Eagle",
    fish : "Seahorse"
};

export default (state = initialState, action) => {

    const newState = Object.assign({}, state);

    switch (action.type) {

        case 'SET_MAMMAL':
            newState.mammal = action.animal;
            break;

        case 'SET_BIRD':
            newState.bird = action.animal;
            break;

        case 'SET_FISH':
            newState.fish = action.animal;
            break;    

        default:
            return state;
    }

    return newState;

};