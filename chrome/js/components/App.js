import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store';

import Navbar from './Navbar';
import Home from './Home';
import Result from './Result';


export class App extends Component {
    constructor(props) {
        super(props);
    }
    render(){
       return  (
           <div>
               <div>
                   <Navbar />
               </div>
               <div>
                   {
                       (this.props.restaurants.length > 0)
                       ? <Result />
                       : <Home />
                   }
               </div>
           </div>
       )
    }
}

const mapStateToProps = (state) => {
    return {
        restaurants: state.result.restaurants
    }
};

export default connect(
    mapStateToProps,
    {},
)(App)
