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

    describe('Exhibit component', () => {

        let exhibit, setAnimalSpy, animal, animals, onChangeSpy;
        beforeEach('Create component and onChange spy', () => {
            animals = ['Tiger', 'Pig']
            animal = 'Tiger'
            setAnimalSpy = () => {};
            exhibit = shallow(<Exhibit setAnimal={setAnimalSpy} animal={animal} animals={animals} />);
        });

        it('uses <AnimalSelect /> and <Cage />', () => {
            expect(exhibit.find(Cage).length).to.be.equal(1);
            expect(exhibit.find(AnimalSelect).length).to.be.equal(1);
        });

        it('passes its own animal prop to <Cage />', () => {
            const theCage = exhibit.find(Cage).nodes[0];
            expect(theCage.props.animal).to.be.equal(animal);
        });

        it('passes its own setAnimal prop to <AnimalSelect /> as submitAnimal', () => {
            const theSelect = exhibit.find(AnimalSelect).nodes[0];
            expect(theSelect.props.submitAnimal).to.be.equal(setAnimalSpy);
        });

    });

    describe('Cage component', () => {

        let cage;
        beforeEach('Create component', () => {
             cage = shallow(<Cage animal={'Panda'} />);
        });

        it('should be a <div> with an expected background', () => {
            expect(cage.is('div')).to.be.equal(true);
            expect(cage.get(0).props.style.backgroundImage).to.be.equal('url(./src/img/Panda.gif');
        });

    }); 


    describe('AnimalSelect component', () => {

        let animalSelect, animals, singleAnimal, setAnimalSpy;
        beforeEach('Create component', () => {
            setAnimalSpy = spy();
            animals = ['Octopus', 'Seahorse', 'Stingray'];
            singleAnimal = 'Octopus';
            animalSelect = shallow(<AnimalSelect submitAnimal={setAnimalSpy} animals={animals} animal={singleAnimal}/>);
        });

        it('should be a form', () => {
            expect(animalSelect.is('form')).to.be.true;
        });

        it('has an initial local state of {selectedAnimal = ""}', () => {
            expect(animalSelect.state()).to.be.deep.equal({
                selectedAnimal: ''
            });
        });

        it('invokes prop submitAnimal when button clicked', () => {

            let viewAnimalForm = animalSelect.find('form');

            animalSelect.setState({selectedAnimal : 'Octopus'});

            viewAnimalForm.simulate('submit');

            expect(setAnimalSpy.calledWith('Octopus')).to.be.true;

        });

    });   
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