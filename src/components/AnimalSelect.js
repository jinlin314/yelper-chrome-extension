import React, {Component} from 'react';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            selectedAnimal : 'Tiger'
        };
        this.handleChange = this.handleChange.bind(this);
        this.viewAnimal = this.viewAnimal.bind(this);
    }

    handleChange(event) {
        this.setState({selectedAnimal: event.target.value});
    }

    viewAnimal(event) {
        this.props.submitAnimal(this.state.selectedAnimal);
        event.preventDefault();
    }

    render() {
        console.log('anial', this.state, this.props)
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
                <input type="submit" value="Submit" />
            </form>
        );
    }

}