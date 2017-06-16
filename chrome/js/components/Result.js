/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import store from '../store';

export class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const restaurants = this.props.restaurants;
        return  (
            <div>
                <h1>this is result component</h1>
                {
                    restaurants.map(restaurant => {
                        return (
                            <div>
                                <Well bsStyle="small">
                                    <h4>{restaurant.categories.title}</h4>
                                    <p>{restaurant.location.display_address[0] + ', ' + restaurant.location.display_address[1]}</p>
                                    <p>{restaurant.phone}</p>
                                    <p>
                                        price: {restaurant.price},
                                        rating: {restaurant.rating}
                                    </p>

                                </Well>
                            </div>
                        )
                    })
                }
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
)(Result)

