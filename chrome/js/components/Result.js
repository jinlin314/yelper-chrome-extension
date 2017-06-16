/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {Well, Table, Grid, Col, Row, Image, Panel, Button} from 'react-bootstrap';
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
                <section>
                {
                    restaurants.map((restaurant,i) => {
                        return (
                            <div key={i}>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td className="imgCol">
                                                <a href={restaurant.url}><Image className="img" alt="171x180" src={restaurant.image_url} /></a>
                                            </td>
                                            <td className="infoCol">
                                                <Panel>
                                                    <p className="restaurantName"><a href={restaurant.url}>{restaurant.name}</a></p>
                                                    <p>{restaurant.location.display_address[0] + ', ' + restaurant.location.display_address[1]}</p>
                                                    <p>{restaurant.phone}</p>
                                                    <p>
                                                        price: {restaurant.price},
                                                        rating: {restaurant.rating}
                                                    </p>
                                                </Panel>
                                            </td>
                                            <td className="addFav">
                                                <p><Button><span className="glyphicon glyphicon-star-empty"></span></Button></p>
                                                <p><Button><span className="glyphicon glyphicon-edit"></span></Button></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        )
                    })
                }
                </section>
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

