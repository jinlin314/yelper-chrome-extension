/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import store from '../store';
import {getAll, getByCuisine, getByPrice, select, add} from '../reducers/restaurant'

import yelp from 'yelp-fusion';
import {clientId, clientSecret} from '../secret'



export default class Result extends Component {
    constructor(props) {
        super(props);
        this.geoFindMe = this.geoFindMe.bind(this);
    }

    geoFindMe() {
        var output = document.getElementById("testGeo");

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;

            output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is ' + longitude + '</p>';

        }

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        }

        output.innerHTML = "<p>Locating…</p>";

        navigator.geolocation.getCurrentPosition(success, error);
    }

    render() {
        return  (
            <div>

            </div>
        )
    }
}
