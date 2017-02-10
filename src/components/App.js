import React, {Component} from 'react';
import  Exhibit from './Exhibit';
import store from '../store';
import {setMammal, setAnimals} from '../store/action-creators/actions';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            mammal: 'Tiger'
        };
        this.setMammal = this.setMammal.bind(this);
    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState(store.getState());
        });

    }

    setMammal(animal) {
        store.dispatch(setMammal(animal));
    }


    render() {
        const mammals = ['Tiger', 'Panda'];
        const birds = [];
        return (
            <div>
                <h1>E-Zoos.biz</h1>
                <h2>A world leader in virtual zoo technology</h2>
                <div className="clearfix">
                    <h3>Mammals</h3>
                    <Exhibit setAnimal={this.setMammal} animal={this.state.mammal} animals={mammals} />

                </div>
             
            </div>
        );
    }

}