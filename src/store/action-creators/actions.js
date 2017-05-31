
//======================= ACTIONS ===========================//

export const SET_MAMMAL = 'SET_MAMMAL';

export const SET_BIRD = 'SET_BIRD';

export const SET_FISH = 'SET_FISH';


//==================== ACTION CREATORS ====================//

export const setMammal = mammal => ({type: SET_MAMMAL, animal: mammal});

export const setBird = bird => ({type: SET_BIRD, animal: bird});

export const setFish = fish => ({type: SET_FISH, animal: fish});





