import React, {Component} from 'react';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            firstAnimal : 'Tiger'
        };
        this.handleChange = this.handleChange.bind(this);
        this.tryAnimal = this.tryAnimal.bind(this);
    }

    handleChange(event) {
        this.setState({firstAnimal: event.target.value});
    }

    tryAnimal(event) {
        alert('Your animal is: ' + this.state.firstAnimal);
        this.props.submitAnimal(this.state.firstAnimal);
        event.preventDefault();
    }

    render() {
        const setA = this.setAnimal;
        return (
            <form onSubmit={this.tryAnimal}>
                <label>
                  Select an Animal: 
                  <select value={this.state.firstAnimal} onChange={this.handleChange}>
                    <option value="Tiger">Tiger</option>
                    <option value="Panda">Panda</option>
                  </select>
                </label>
                <input type="submit" value="Submit" />
              </form>

        );
    }

}