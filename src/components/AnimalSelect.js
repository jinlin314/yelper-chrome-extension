import React, {Component} from 'react';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            firstAnimal : 'Tiger'
        };
        this.setAnimal = this.setAnimal.bind(this);
        this.tryAnimal = this.tryAnimal.bind(this);
    }

    setAnimal(animal) {
        return (v) => {
            this.setState({
                [color]: v
            });
        };
    }

    tryAnimal() {
        this.props.submitAnimal([
            this.state.firstAnimal
        ]);
    }

    render() {
        const setA = this.setAnimal;
        return (
            <div className="slider-group">
                
                <button onClick={this.tryAnimal}>View Animal</button>
            </div>
        );
    }

}