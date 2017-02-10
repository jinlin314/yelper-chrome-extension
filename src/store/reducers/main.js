const initialState = {};

export default (state = initialState, action) => {

    const newState = Object.assign({}, state);

    switch (action.type) {   

        default:
            return state;
    }

    return newState;

};