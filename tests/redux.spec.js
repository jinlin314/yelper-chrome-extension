import {expect} from 'chai';
import {createStore} from 'redux';

import {setMammal, setBird, setFish} from '../src/store/action-creators/actions';
import mainReducer from '../src/store/reducers/main';

const mammals = ['Tiger', 'Panda', 'Pig'];
const birds = ['Eagle', 'Flamingo', 'Penguin'];
const fish = [ 'Seahorse', 'Octopus', 'Stingray'];

function getRandomAnimal (animals) {
    return animals[Math.floor(Math.random()*3)]
}

describe('Action Creators', () => {

	  describe('setMammal', () => {
        it('returns properly formatted action', () => {
            const testMammal = getRandomAnimal(mammals);
            expect(setMammal(testMammal)).to.be.deep.equal({
                type: 'SET_MAMMAL',
                animal : testMammal
            });
        });
    });

    describe('setBird', () => {
        it('returns properly formatted action', () => {
            const testBird = getRandomAnimal(birds);
            expect(setBird(testBird)).to.be.deep.equal({
                type: 'SET_BIRD',
                animal: testBird
            });
        });
    });

    describe('setFish', () => {
        it('returns properly formatted action', () => {
            const testFish = getRandomAnimal(fish);
            expect(setFish(testFish)).to.be.deep.equal({
                type: 'SET_FISH',
                animal: testFish
            });
        });
    });

});


describe('Reducer', () => {

    const initialState = {
        selectedMammal : "Tiger",
        selectedBird : "Eagle",
        selectedFish : "Seahorse",
        mammals,
        birds,
        fish
        }
    let testStore;

    beforeEach('Create testing store and freezing it', () => {
        testStore = createStore(mainReducer);
        // freeze store so we don't mutate!!
        Object.freeze(testStore.getState());
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal(initialState);
    });

    describe('SET_MAMMAL', () => {
        const newMammal = getRandomAnimal(mammals);
        it('sets mammal to animal in action creator (non-mutating)', () => {
            testStore.dispatch({ type: 'SET_MAMMAL', animal: newMammal});
            const newState = testStore.getState();
            expect(newState.selectedMammal).to.be.deep.equal(newMammal);
            expect(newState.selectedBird).to.be.deep.equal("Eagle");
            expect(newState.selectedFish).to.be.deep.equal("Seahorse");
        });
    });

    describe('SET_BIRD', () => {
        const newBird = getRandomAnimal(birds);
        it('sets bird to animal in action creator (non-mutating)', () => {
            testStore.dispatch({ type: 'SET_BIRD', animal: newBird });
            const newState = testStore.getState();
            expect(newState.selectedBird).to.be.deep.equal(newBird);
            expect(newState.selectedMammal).to.be.deep.equal("Tiger");
            expect(newState.selectedFish).to.be.deep.equal("Seahorse");
        });
    });

    describe('SET_FISH', () => {
        const newFish = getRandomAnimal(fish);
        it('sets fish to animal in action creator (non-mutating)', () => {
            testStore.dispatch({ type: 'SET_FISH', animal: newFish });
            const newState = testStore.getState();
            expect(newState.selectedFish).to.be.deep.equal(newFish);
            expect(newState.selectedMammal).to.be.deep.equal("Tiger");
            expect(newState.selectedBird).to.be.deep.equal("Eagle");
        });
    });

    describe('SET_REPTILE', () => {
        it('tries to use invalid action type', () => {
            testStore.dispatch({ type: 'SET_REPTILE', animal: "Ball Python" });
            const newState = testStore.getState();
            expect(newState).to.be.deep.equal(initialState);
        });
    });

});