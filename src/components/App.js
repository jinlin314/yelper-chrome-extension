import React, {Component} from 'react';
import  Exhibit from './Exhibit';
import store from '../store';
import {setMammal, setBird, setFish} from '../store/action-creators/actions';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            mammal: 'Tiger'
        };
        this.setMammal = this.setMammal.bind(this);
        this.setBird = this.setBird.bind(this);
        this.setFish = this.setFish.bind(this);
    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState(store.getState());
        });

    }

    setMammal(animal) {
        store.dispatch(setMammal(animal));
    }

    setBird(bird) {
        store.dispatch(setBird(bird));
    }

    setFish(fish) {
        store.dispatch(setFish(fish));
    }


    render() {
        const mammals = ['Tiger', 'Panda', 'Pig'];
        const birds = ['Flamingo', 'Penguin', 'Eagle'];
        const fish = ['Octopus', 'Stingray', 'Seahorse']
        return (
            <div>
                <h1>E-Zoos.biz</h1>
                <div className="clearfix">
                    <h2>Mammals</h2>
                    <Exhibit setAnimal={this.setMammal} animal={this.state.mammal} animals={mammals} />
                    <h2>Birds</h2>
                    <Exhibit setAnimal={this.setBird} animal={this.state.bird} animals={birds} />
                    <h2>Fish</h2>
                    <Exhibit setAnimal={this.setFish} animal={this.state.fish} animals={fish} />
                </div>
             
            </div>
        );
    }

}