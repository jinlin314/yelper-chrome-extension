import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

import AnimalSelect from '../src/components/AnimalSelect';
import Cage from '../src/components/Cage';
import Exhibit from '../src/components/Exhibit';

describe('React components', () => {
    let animals = ['Tiger', 'Panda', 'Pig', 'Eagle', 'Flamingo', 'Penguin', 'Seahorse', 'Octopus', 'Stingray']

    function getRandomAnimal () {
        return animals[Math.floor(Math.random()*5)]
    }

    describe('<Exhibit /> component', () => {

        let exhibit, selectedAnimal;
        beforeEach('Create component and onChange spy', () => {
            selectedAnimal = getRandomAnimal();
            // this is the enzyme way of creating the tag and sending it props
            exhibit = shallow(<Exhibit animals={animals} selectedAnimal={selectedAnimal}/>);
        });

        it('has an initial *local* state with a selectedAnimal', () => {
            expect(exhibit.state()).to.be.deep.equal({selectedAnimal});
        });

        it('uses <AnimalSelect /> and <Cage />', () => {
            expect(exhibit.find(Cage).length).to.be.equal(1);
            expect(exhibit.find(AnimalSelect).length).to.be.equal(1);
        });

        it('passes its own animal prop to <Cage />', () => {
            expect(exhibit.find(Cage).props().selectedAnimal).to.be.equal(selectedAnimal);
        });

        it('passes its own animals prop to <AnimalSelect />', () => {
            expect(exhibit.find(AnimalSelect).props().animals).to.be.deep.equal(animals);
        });

        it('has a setAnimal function that takes in an animal and sets the state', () => {
            let newAnimal = getRandomAnimal();
            expect(exhibit.instance().setAnimal).to.be.function;
            exhibit.instance().setAnimal(newAnimal);
            expect(exhibit.state()).to.be.deep.equal({selectedAnimal: newAnimal})
        });        

        it('ensures setAnimal function is properly bound', () => {
            expect(exhibit.instance().setAnimal.hasOwnProperty('prototype')).to.be.false;
        });

        it('passes its own setAnimal prop to <AnimalSelect /> as submitAnimal', () => {
            expect(exhibit.find(AnimalSelect).props().submitAnimal).to.be.equal(exhibit.instance().setAnimal);
        });

    });

    describe('<Cage /> component', () => {

        let cage, animal;
        beforeEach('Create component', () => {
            animal = getRandomAnimal();
            cage = shallow(<Cage selectedAnimal={animal} />);
        });

        it('should be a <div> with an expected background', () => {
            expect(cage.is('div')).to.be.equal(true);
            expect(cage.get(0).props.style.backgroundImage).to.be.equal(`url(./src/img/${animal}.gif`);
        });

    });


    describe('<AnimalSelect /> component', () => {

        let animalSelect, selectedAnimal, setAnimalSpy;
        beforeEach('Create component', () => {
            setAnimalSpy = spy();
            selectedAnimal = getRandomAnimal();
            animalSelect = shallow(<AnimalSelect submitAnimal={setAnimalSpy} animals={animals} />);
        });

        it('should be a form', () => {
            expect(animalSelect.is('form')).to.be.true;
        });

        it('form should have a select that lists all the animals as options', () => {
            expect(animalSelect.find('select').length).to.be.equal(1);
            // loops through each option in the select
            // determines if the option's key is equivalent to the animal
            animalSelect.find('option').forEach((animalOption, i) => {
                expect(animalOption.key()).to.be.equal(animals[i])
                expect(animalOption.text().trim()).to.be.equal(animals[i])
            })
        });

        it('should have a label to describe the select', () => {
            const selectLabel = animalSelect.find('label')
            expect(selectLabel.length).to.be.equal(1);
            expect(selectLabel.text()).to.be.equal("Select an Animal: ");
        });

        it('select should have an onChange event that submits the new animal', () => {
            expect(animalSelect.props('select').onChange).to.be.function;
            // choosing a random animal
            let animal = getRandomAnimal()
            // simulating a 'change' event with an event described as the second argument given to `simulate`
            animalSelect.find('select').simulate('change', {target: {value: animal}});
            // the spy sent in should be called with the argument described
            expect(setAnimalSpy.calledWith(animal)).to.be.true;
        });

    });

});
