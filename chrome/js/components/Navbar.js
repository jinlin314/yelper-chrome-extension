/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import store from '../store';
import {Navbar, FormGroup, FormControl, Button, Well} from 'react-bootstrap';

import axios from 'axios';
import {yelpSearch} from '../utils'

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: "all",
            inputValue: '',
            location: this.props.location
        }

        // this.geoFindMe = this.geoFindMe.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    // Filter the narrow the search results
    setFilter(filterType) {
        this.setState({selectedFilter: filterType})
    }

    // function to locate the current physical location
// geoFindMe() {
//     let output = document.getElementById("testGeo");
//
//     const success = (position) => {
//         let latitude  = position.coords.latitude;
//         let longitude = position.coords.longitude;
//
//         this.setState({location: [latitude, longitude]})
//         output.innerHTML = `<p>Current GPS location is ${this.state.location}`;
//     };
//
//     const error = () => {
//         this.setState({location: null});
//         output.innerHTML = "Unable to retrieve your location";
//     };
//
//     output.innerHTML = "<p>Searching for current location...</p>";
//
//     navigator.geolocation.getCurrentPosition(success, error);
// }

    onSearchSubmit(event) {
        event.preventDefault();
        console.log('in the search handler')

        store.dispatch(geoFindMe());

        let keywords = event.target.keywords.value;
        let filterType = this.state.selectedFilter;
        let latitude  = this.state.location[0];
        let longitude = this.state.location[1];

        axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
            .then(res => res.data.results)
            .then(results => {
                const address = results[3].formatted_address;
                yelpSearch(keywords, filterType, address);
            })
            .catch(console.error)

    }


    render() {
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
                                <li><a onClick={()=>this.setFilter("keywords")}>keywords</a></li>
                                <li className="divider"></li>
                                <li><a onClick={()=>this.setFilter("business")}>Cuisine</a></li>
                                <li><a onClick={()=>this.setFilter("delivery")}>Delivery</a></li>
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

const mapStateToProps = (state) => {
    return {
        results: state.restautantResults.location
    }
}

export default connect(
    mapStateToProps,
    {},
)(Navbar)
