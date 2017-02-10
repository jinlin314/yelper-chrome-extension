import React, {Component} from 'react';
import  Exhibit from './Exhibit';
import store from '../store';
import {setMammal, setBird, setFish} from '../store/action-creators/actions';

export default class extends Component {

    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    render() {

        const mammals = ['Tiger', 'Panda', 'Pig'];
        const birds = ['Eagle', 'Flamingo', 'Penguin'];
        const fish = [ 'Seahorse', 'Octopus', 'Stingray'];

        return (
            <div>
                <h1>E-Zoos.biz</h1>
                <div className="clearfix">
                    <div className="block">
                        <h2>Mammals</h2>
                        <Exhibit animal={this.state.mammal} animals={mammals} setAnimal={setMammal} />
                    </div>
                    <div className="block">
                        <h2>Birds</h2>
                        <Exhibit animal={this.state.bird} animals={birds} setAnimal={setBird} />
                    </div>
                    <div className="block">
                        <h2>Fish</h2>
                        <Exhibit animal={this.state.fish} animals={fish} setAnimal={setFish} />
                    </div>
                </div>
            </div>
        );
    }

}