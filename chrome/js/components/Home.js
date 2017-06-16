/**
 * Created by jinlin on 6/16/17.
 */

import React, {Component} from 'react';
import {Navbar, FormGroup, FormControl, Button, Well} from 'react-bootstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>this is the home container</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.result.location
    }
}

export default connect(
    mapStateToProps,
    {},
)(Home)
