import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';


export default class extends Component {

  constructor() {
    super();
  }

  render () {
  	const { setAnimal, animals } = this.props;
  	return (
	    <div className="exhibit">
	    </div>
  		
  		)
  }
};