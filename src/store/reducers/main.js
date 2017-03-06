const initialState = {
	selectedMammal : "Tiger",
  selectedBird : "Eagle",
  selectedFish : "Seahorse",
  mammals: ['Tiger', 'Panda', 'Pig'],
	birds: ['Eagle', 'Flamingo', 'Penguin'],
	fish: [ 'Seahorse', 'Octopus', 'Stingray']
};

export default (state = initialState, action) => {

  // const newState = state;
  const newState = Object.assign({}, state);

  switch (action.type) {
  	case 'SET_MAMMAL':
  		newState.selectedMammal = action.animal;
  		break;
  	case 'SET_BIRD':
  		newState.selectedBird = action.animal;
  		break;
  	case 'SET_FISH':
  		newState.selectedFish = action.animal;
  		break;
  }
  return newState;
};
