import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store';

import Navbar from './Navbar';
import Home from './Home';
import Result from './Result';

import {yelpSearch} from '../reducers/restaurant';


export class App extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        console.log('App props, ', this.props)
       return  (
           <div>
               <div>
                   <Navbar />
               </div>
               <div>
                   {
                       (this.props.searchBool)
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
        restaurants: state.result.restaurants,
        searchBool: state.result.search,
        location: state.result.location
    }
};

export default connect(
    mapStateToProps,
    {},
)(App)
