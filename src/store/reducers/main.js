import React from 'react';
import {SET_MAMMAL, SET_FISH, SET_BIRD} from '../action-creators/actions';


const initialState = {
        selectedMammal : "Tiger",
        selectedBird : "Eagle",
        selectedFish : "Seahorse",
        mammals: ['Tiger', 'Panda', 'Pig'],
        birds: ['Eagle', 'Flamingo', 'Penguin'],
        fish: [ 'Seahorse', 'Octopus', 'Stingray']
    }

// make sure you understand the parameters here!
	// with any reducer we expect 2 arguments
	// we are able to give a default value to a parameter in the way seen below
export default (state = initialState, action) => {
    switch (action.type){
        case SET_MAMMAL:
            return Object.assign({}, state, {selectedMammal: action.animal});
        case SET_FISH:
            return Object.assign({}, state, {selectedFish: action.animal});
        case SET_BIRD:
            return Object.assign({}, state, {selectedBird: action.animal});
        default:
            return state;
    }
};
