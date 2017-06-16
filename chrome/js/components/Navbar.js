/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store';
import {Navbar, FormGroup, FormControl, Button, Well} from 'react-bootstrap';

import axios from 'axios';
import {yelpSearch} from '../reducers/restaurant'
// import {yelpSearch} from '../utils'

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: "keywords",
            inputValue: ''
        }

        // this.geoFindMe = this.geoFindMe.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    // Filter the narrow the search results
    setFilter(filterType) {
        this.setState({selectedFilter: filterType})
    }

    // on submit, collect all datas, pass them into yelpSearch
    onSearchSubmit(event) {
        event.preventDefault();

        let keywords = event.target.keywords.value;
        let filterType = this.state.selectedFilter;
        let latitude  = this.props.location[0];
        let longitude = this.props.location[1];

        axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
            .then(res => res.data.results)
            .then(results => {
                const address = results[3].formatted_address;
                // yelpSearch(keywords, filterType, address);
                store.dispatch(yelpSearch(keywords, filterType, address));
            })
            .catch(console.error)

    }


    render() {
        return (
            <div>
                {
                    (this.props.location)
                    ? (
                        <div>
                        <Navbar>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#">YelpEater</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <form onSubmit={this.onSearchSubmit}>
                                    <Navbar.Form pullLeft>
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.state.selectedFilter}<b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li><a onClick={()=>this.setFilter("keywords")}>keywords</a></li>
                                            <li><a onClick={()=>this.setFilter("delivery")}>Delivery</a></li>
                                        </ul>
                                        {' '}
                                        <FormGroup>
                                            <FormControl name="keywords" id="searchBox" type="text" placeholder="Search" />
                                        </FormGroup>
                                        {' '}
                                        <Button type="submit" onClick={this.geoFindMe}>Search</Button>
                                        <Button><span className="glyphicon glyphicon-time"></span></Button>
                                    </Navbar.Form>
                                </form>
                            </Navbar.Collapse>
                        </Navbar>
                        </div>
                    )
                    :(
                        <div>
                            <Navbar>
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <a href="#">YelpEater</a>
                                    </Navbar.Brand>
                                    <Navbar.Toggle />
                                </Navbar.Header>
                            </Navbar>
                            <Well>
                                Locating current Location...
                            </Well>
                        </div>
                    )
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
)(Navigation)
