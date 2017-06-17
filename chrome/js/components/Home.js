/**
 * Created by jinlin on 6/16/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store';
import axios from 'axios';
import {yelpSearch} from '../reducers/restaurant';

import {Panel,Image} from 'react-bootstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    (this.props.location)
                    ? (<Panel><Image id='home' src="../../src/browser_action/img/home.png" /></Panel>)
                        : <div></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.result.location
    }
};

export default connect(
    mapStateToProps,
    {},
)(Home)
