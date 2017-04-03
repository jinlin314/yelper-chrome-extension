/*
This file is NOT necessary to edit for the test specs
*/

import React, {Component} from 'react';
import  Exhibit from './Exhibit';
// The below code will be useful if you want to use your redux store as the one source of state and truth
// import store from '../store';
// import {setMammal, setBird, setFish} from '../store/action-creators/actions';

export default class App extends Component {

    constructor() {
        super();
        // The below code will be useful if you want to use your redux store as the one source of truth
        // this.state = store.getState();
        this.state =  {
            selectedMammal : "Tiger",
            selectedBird : "Eagle",
            selectedFish : "Seahorse",
            mammals: ['Tiger', 'Panda', 'Pig'],
            birds: ['Eagle', 'Flamingo', 'Penguin'],
            fish: [ 'Seahorse', 'Octopus', 'Stingray']
        };
    }

    // The below code will be useful if you want to use your redux store as the one source of state and truth
    // componentDidMount() {
    //     store.subscribe(() => {
    //         this.setState(store.getState());
    //     });
    // }

    render() {
        const { selectedMammal, selectedBird, selectedFish, mammals, birds, fish } = this.state;
        return (
            <div>
                <h1>E-Zoos.biz</h1>
                <div className="clearfix">
                    <div className="block">
                        <h2>Mammals</h2>
                        {/* setAnimal={setMammal} sending in setAnimal in this way will allow you to connect your redux store with your Exhibit tag 
                        (this does not follow test specs, but is good practice) */}
                        <Exhibit selectedAnimal={selectedMammal} animals={mammals}  />
                    </div>
                    <div className="block">
                        <h2>Birds</h2>
                        <Exhibit selectedAnimal={selectedBird} animals={birds} />
                    </div>
                    <div className="block">
                        <h2>Fish</h2>
                        <Exhibit selectedAnimal={selectedFish} animals={fish} />
                    </div>
                </div>
            </div>
        );
    }

}