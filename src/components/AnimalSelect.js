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
 
     viewAnimal(event) {
         this.props.submitAnimal(this.state.selectedAnimal);
         event ? event.preventDefault() : null;
      }
  
      render() {
          return (
              <form>
                  <label>
                   Select an Animal: 
                   <select onChange={this.handleChange}>
                       {this.props.animals && this.props.animals.map(animal => {
                            return <option key={animal}>{animal}</option>;
                       })}
                    </select>
                  </label>
                 <input type="submit" value="View" />
              </form>
          );
      }
 
 }