/**
 * Created by jinlin on 6/16/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store';

import {Navbar, FormGroup, FormControl, Button, Well} from 'react-bootstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>home</h1>
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
)(Home)
