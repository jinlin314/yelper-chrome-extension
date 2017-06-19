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
                       (this.props.searchBool || this.props.showBool)
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
        location: state.result.location,
        showBool: state.favorites.showBool
    }
};

export default connect(
    mapStateToProps,
    {},
)(App)
