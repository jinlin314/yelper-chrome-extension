import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';


export default class Exhibit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedAnimal: props.selectedAnimal
    };

    this.setAnimal = this.setAnimal.bind(this);
  }

  setAnimal(animal) {
      this.setState({selectedAnimal: animal});
  }


  render () {
      // console.log('>>> exhibit props: ',this.props);
  	return (
	    <div className="exhibit">
            <Cage selectedAnimal={this.state.selectedAnimal} />
            <AnimalSelect
                selectedAnimal={this.state.selectedAnimal}
                animals={this.props.animals}
                submitAnimal={this.setAnimal}
            />
	    </div>
  		)
  }
};