import {expect} from 'chai';
import {createStore} from 'redux';

import {setMammal, setBird, setFish} from '../src/store/action-creators/actions';
import mainReducer from '../src/store/reducers/main';

describe('Action Creators', () => {

	  describe('setMammal', () => {
        xit('returns properly formatted action', () => {
            const testMammal = "Tiger";
            expect(setMammal(testMammal)).to.be.deep.equal({
                type: 'SET_MAMMAL',
                animal : testMammal
            });
        });
    });

    describe('setBird', () => {
        xit('returns properly formatted action', () => {
            const testBird = "Penguin";
            expect(setBird(testBird)).to.be.deep.equal({
                type: 'SET_BIRD',
                animal: testBird
            });
        });
    });

    describe('setFish', () => {
        xit('returns properly formatted action', () => {
            const testFish = 'Octopus';
            expect(setFish(testFish)).to.be.deep.equal({
                type: 'SET_FISH',
                animal: testFish
            });
        });
    });

});


describe('Reducer', () => {

    const initialState = {
        mammal : "Tiger",
        bird : "Eagle",
        fish : "Seahorse"
        }
    let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(mainReducer);
    });

    xit('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal(initialState);
    });

    describe('SET_MAMMAL', () => {
        xit('sets mammal to animal in action creator', () => {
            testStore.dispatch({ type: 'SET_MAMMAL', animal: "Pig" });
            const newState = testStore.getState();
            expect(newState.mammal).to.be.deep.equal("Pig");
            expect(newState.bird).to.be.deep.equal("Eagle");
            expect(newState.fish).to.be.deep.equal("Seahorse");
        });

    });


    describe('SET_BIRD', () => {
        xit('sets bird to animal in action creator', () => {
            testStore.dispatch({ type: 'SET_BIRD', animal: "Penguin" });
            const newState = testStore.getState();
            expect(newState.bird).to.be.deep.equal("Penguin");
        });

    });

    describe('SET_FISH', () => {
        xit('sets fish to animal in action creator', () => {
            testStore.dispatch({ type: 'SET_FISH', animal: "Stingray" });
            const newState = testStore.getState();
            expect(newState.fish).to.be.deep.equal("Stingray");
        });

    });

    describe('SET_REPTILE', () => {
        xit('tries to use invalid action type', () => {
            testStore.dispatch({ type: 'SET_REPTILE', animal: "Ball Python" });
            const newState = testStore.getState();
            expect(newState).to.be.deep.equal(initialState);
        });

    });

});