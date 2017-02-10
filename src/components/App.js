import React, {Component} from 'react';
import  Exhibit from './Exhibit';
import store from '../store';
import {setFirst, setAnimals} from '../store/action-creators/actions';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            firstAnimal: 'Tiger'
        };
        this.setFirstAnimal = this.setFirstAnimal.bind(this);
    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState(store.getState());
        });

        // if (location.search !== '') {
        //     const animals = location.search
        //         .split('?')[1]
        //         .split('&')
        //         .map(s => s.split('=')[1])
        //         .map(s => s.split(',').map(c => +c));
        //     store.dispatch(setAnimals(animals));
        // }

    }

    setFirstAnimal(animal) {
        store.dispatch(setFirst(animal));
    }


    render() {
        return (
            <div>
                <h1>E-Zoos.biz</h1>
                <h2>A world leader in virtual zoo technology</h2>
                <div className="clearfix">
                   <Exhibit setAnimal={this.setFirstAnimal} animal={this.state.firstAnimal} />
                </div>
             
            </div>
        );
    }

}