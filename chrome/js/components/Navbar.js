/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../store';
import {Navbar, FormGroup, FormControl, Button, Image, Panel} from 'react-bootstrap';

import axios from 'axios';
import {yelpSearch} from '../reducers/restaurant';
import {showFavor} from '../reducers/favorites';

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
        this.showFavorites = this.showFavorites.bind(this);
    }

    // Filter the narrow the search results
    setFilter(filterType) {
        this.setState({selectedFilter: filterType})
    }

    // on submit, collect all datas, pass them into yelpSearch
    onSearchSubmit(event) {
        event.preventDefault();
        store.dispatch(showFavor(false));
        let filterType = this.state.selectedFilter;
        let keywords;
        if (this.state.selectedFilter === "delivery"){
            keywords = '';
        }else {
            keywords = event.target.keywords.value;
        }

        let latitude  = this.props.location[0];
        let longitude = this.props.location[1];

        axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
            .then(res => res.data.results)
            .then(results => {
                const address = results[3].formatted_address;
                store.dispatch(yelpSearch(keywords, filterType, address));
            })
            .catch(console.error)

    }

    showFavorites() {
        store.dispatch(showFavor(true));
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
                                <Image className="logo" src="../../src/browser_action/img/logo48.png"></Image>
                                <a>YelpMe</a>
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
                                        {
                                            (this.state.selectedFilter !== "delivery")
                                            ? (
                                                <FormGroup>
                                                    <FormControl name="keywords" id="searchBox" type="text"
                                                                 placeholder="Search"/>
                                                </FormGroup>
                                            )
                                                :(<FormGroup></FormGroup>)
                                        }
                                        {' '}
                                        <Button type="submit" onClick={this.geoFindMe}>Search</Button>
                                        <Button onClick={this.showFavorites}><span className="glyphicon glyphicon-star-empty"></span></Button>
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
                                        <Image className="logo" src="../../src/browser_action/img/logo48.png"></Image>
                                        <a>YelpMe</a>
                                    </Navbar.Brand>
                                    <Navbar.Toggle />
                                </Navbar.Header>
                            </Navbar>
                            <Panel>Decting current loction...<Image id='loading' src="../../src/browser_action/img/loadinfo.gif" /></Panel>
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
