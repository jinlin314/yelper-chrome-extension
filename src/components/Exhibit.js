import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';


export default class extends Component {

  constructor(props) {
    super();
    this.state = {
    	selectedAnimal: props.selectedAnimal
    }
    this.setAnimal = this.setAnimal.bind(this);
  }

  setAnimal (selectedAnimal) {
  	this.setState({selectedAnimal});
  }

  render () {
  	const { selectedAnimal, animals } = this.props;
  	return (
	    <div className="exhibit">
	    	<AnimalSelect animals={animals} submitAnimal={ this.setAnimal }/>
	    	<Cage selectedAnimal={selectedAnimal}/>
	    </div>
  		
  		)
  }
};