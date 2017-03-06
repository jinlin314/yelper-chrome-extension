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

    describe('<Exhibit /> component', () => {

        let exhibit, setAnimalSpy, selectedAnimal, animals, onChangeSpy;
        beforeEach('Create component and onChange spy', () => {
            animals = ['Tiger', 'Pig'];
            selectedAnimal = 'Tiger';
            setAnimalSpy = spy();
            exhibit = shallow(<Exhibit setAnimal={setAnimalSpy} animals={animals} />);
        });

        xit('has an initial *local* state of {selectedAnimal = "Tiger"}', () => {
            expect(animalSelect.state()).to.be.deep.equal({selectedAnimal});
        });

        xit('uses <AnimalSelect /> and <Cage />', () => {
            expect(exhibit.find(Cage).length).to.be.equal(1);
            expect(exhibit.find(AnimalSelect).length).to.be.equal(1);
        });

        xit('passes its own animal prop to <Cage />', () => {
            const theCage = exhibit.find(Cage).nodes[0];
            expect(theCage.props.selectedAnimal).to.be.equal(selectedAnimal);
        });

        xit('passes its own animals prop to <AnimalSelect />', () => {
            const theSelect = exhibit.find(AnimalSelect).nodes[0];
            expect(theSelect.props.animals).to.be.deep.equal(animals);
        });

        xit('passes its own setAnimal prop to <AnimalSelect /> as submitAnimal', () => {
            const theSelect = exhibit.find(AnimalSelect).nodes[0];
            expect(theSelect.props.submitAnimal).to.be.equal(setAnimalSpy);
        });

    });

    describe('<Cage /> component', () => {

        let cage;
        beforeEach('Create component', () => {
            cage = shallow(<Cage animal={'Panda'} />);
        });

        xit('should be a <div> with an expected background', () => {
            expect(cage.is('div')).to.be.equal(true);
            expect(cage.get(0).props.style.backgroundImage).to.be.equal('url(./src/img/Panda.gif');
        });

    });


    describe('<AnimalSelect /> component', () => {

        let animalSelect, animals, selectedAnimal, setAnimalSpy;
        beforeEach('Create component', () => {
            setAnimalSpy = spy();
            animals = ['Octopus', 'Seahorse', 'Stingray'];
            selectedAnimal = 'Octopus';
            animalSelect = shallow(<AnimalSelect submitAnimal={setAnimalSpy} animals={animals} animal={selectedAnimal}/>);
        });

        xit('should be a form', () => {
            expect(animalSelect.is('form')).to.be.true;
        });

        xit('form should have a select that lists all the animals as options', () => {
            expect(animalSelect.find('select').length).to.be.equal(1);
            // loops through each option in the select
            // determines if the option's key is equivalent to the animal
            animalSelect.find('option').forEach((animalOption, i) => {
                expect(animalOption.key()).to.be.equal(animals[i])
                expect(animalOption.text().trim()).to.be.equal(animals[i])
            })
        });

        xit('select should have an onChange event that submits the new animal', () => {
            expect(animalSelect.getNode('select').props.onChange).to.be.function;
            // choosing a random animal
            let animal = animals[Math.floor(Math.random()+2)]
            // simulating a 'change' event with an event described as the second argument given to `simulate`
            animalSelect.find('select').simulate('change', {target: {value: animal}});
            expect(setAnimalSpy.calledWith(animal)).to.be.true;
        });

        xit('should have a label to describe the select', () => {
            expect(animalSelect.find('label').length).to.be.equal(1);
            expect(animalSelect.text('label')).to.be.equal("Select an Animal: ");
        });

    });

});

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