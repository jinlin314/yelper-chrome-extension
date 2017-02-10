import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {createStore} from 'redux';
import {spy} from 'sinon';

import AnimalSelect from '../src/components/AnimalSelect';
import Cage from '../src/components/Cage';
import Exhibit from '../src/components/Exhibit';
import {setMammal, setBird, setFish} from '../src/store/action-creators/actions';
import mainReducer from '../src/store/reducers/main';

describe('React components', () => {

})

describe('Action Creators', () => {
	  describe('setMammal', () => {

        it('returns properly formatted action', () => {

            const testMammal = "Tiger";

            expect(setMammal(testMammal)).to.be.deep.equal({
                type: 'SET_MAMMAL',
                animal : testMammal
            });

        });

    });

    describe('setBird', () => {

        it('returns properly formatted action', () => {

            const testBird = "Penguin";

            expect(setBird(testBird)).to.be.deep.equal({
                type: 'SET_BIRD',
                animal: testBird
            });

        });

    });

    describe('setFish', () => {

        it('returns properly formatted action', () => {

            const testFish = 'Octopus';

            expect(setFish(testFish)).to.be.deep.equal({
                type: 'SET_FISH',
                animal: testFish
            });

        });

    });
})


describe('Reducer', () => {
	let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(mainReducer);
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal({
            mammal : "Tiger",
		    bird : "Eagle",
		    fish : "Seahorse"
        });
    });

    describe('SET_MAMMAL', () => {

        it('sets mammal to animal in action creator', () => {
            testStore.dispatch({ type: 'SET_MAMMAL', animal: "Pig" });
            const newState = testStore.getState();
            expect(newState.mammal).to.be.deep.equal("Pig");
            expect(newState.bird).to.be.deep.equal("Eagle");
            expect(newState.fish).to.be.deep.equal("Seahorse");
        });

    });


    describe('SET_BIRD', () => {

        it('sets bird to animal in action creator', () => {
            testStore.dispatch({ type: 'SET_BIRD', animal: "Penguin" });
            const newState = testStore.getState();
            expect(newState.bird).to.be.deep.equal("Penguin");
        });

    });

    describe('SET_FISH', () => {

        it('sets fish to animal in action creator', () => {
            testStore.dispatch({ type: 'SET_FISH', animal: "Stingray" });
            const newState = testStore.getState();
            expect(newState.fish).to.be.deep.equal("Stingray");
        });

    })     
})