import React, {Component} from 'react';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            selectedAnimal : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.viewAnimal = this.viewAnimal.bind(this);
    }

    handleChange(event) {
        this.setState({selectedAnimal: event.target.value});
    }

    viewAnimal() {
        this.props.submitAnimal(this.state.selectedAnimal);
    }

    render() {
        return (
            <form onSubmit={this.viewAnimal}>
                <label>
                  Select an Animal: 
                  <select value={this.state.selectedAnimal} onChange={this.handleChange}>
                    {
                        this.props.animals.map((animal, idx)=> {
                            return <option value={animal} key={idx}>{animal}</option>
                        })
                    }
                  </select>
                </label>
                <input type="submit" value="View" />
            </form>
        );
    }

}