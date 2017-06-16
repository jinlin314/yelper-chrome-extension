/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import store from '../store';
import {Navbar, FormGroup, FormControl, Button, Well} from 'react-bootstrap';

import yelp from 'yelp-fusion';
import {clientId, clientSecret} from '../secret'
import axios from 'axios'


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: "all",
            inputValue: '',
            location: null
        }

        this.geoFindMe = this.geoFindMe.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    // function to locate the current physical location
    geoFindMe() {
        let output = document.getElementById("testGeo");

        const success = (position) => {
            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;

            axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
                .then(res => res.data.results)
                .then(results => {
                    this.setState({location: results[3].formatted_address})
                    output.innerHTML = `<p>Current location is ${this.state.location}`;
                })
                .catch(console.error)
        }

        const error = () => {
            this.setState({location: null});
            output.innerHTML = "Unable to retrieve your location";
        }

        output.innerHTML = "<p>Searching for current location...</p>";

        navigator.geolocation.getCurrentPosition(success, error);
}

    // Filter the narrow the search results
    setFilter(filterType) {
        this.setState({selectedFilter: filterType})
    }

    // get the keywords inputted by user
    onSearchSubmit(event) {
        event.preventDefault();
        const keywords = event.target.keywords.value;
        const filter = this.state.selectedFilter;

    }


    render() {
        console.log(this.state.location);
        return  (
            <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Yelper Eater</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <form onSubmit={this.onSearchSubmit}>
                        <Navbar.Form pullLeft>
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.state.selectedFilter}<b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li><a onClick={()=>this.setFilter("all")}>All Nearby</a></li>
                                <li className="divider"></li>
                                <li><a onClick={()=>this.setFilter("cuisine")}>Cuisine</a></li>
                                <li><a onClick={()=>this.setFilter("delivery")}>Delivery</a></li>
                                <li><a onClick={()=>this.setFilter("reviews")}>By Reviews</a></li>
                                <li className="divider"></li>
                                <li><a onClick={()=>this.setFilter("favorites")}>Favorites</a></li>
                            </ul>
                            {' '}
                            <FormGroup>
                                <FormControl name="keywords" type="text" placeholder="Search" />
                            </FormGroup>
                            {' '}
                            <Button type="submit" onClick={this.geoFindMe}>Search</Button>
                        </Navbar.Form>
                    </form>
                </Navbar.Collapse>
            </Navbar>
                <div id="testGeo"></div>
            </div>
        )
    }
}
