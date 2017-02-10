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
              <form onSubmit={}>
                  <label>
                   Select an Animal: 
                   <select>
                     
                    </select>
                  </label>
                 <input type="submit" value="View" />
              </form>
          );
      }
 
 }