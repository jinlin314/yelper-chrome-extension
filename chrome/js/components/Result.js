/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {Well, Table, OverlayTrigger, Tooltip, Popover, Image, Panel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import store from '../store';
import {addFavorite} from '../reducers/favorites';

export class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            noteOnChromeStorage: '',
            newNote: ''
        };

        this.addFavorite = this.addFavorite.bind(this);
        this.getNote = this.getNote.bind(this);
        this.takeNote = this.takeNote.bind(this);
    }

    componentWillReceiveProps(newProps, oldProps) {
        this.setState({
            favorites: newProps.favorites
        })
    }

    // use the restaurants' phone numbers as the keys, since they are unique
    addFavorite(phone) {

        store.dispatch(addFavorite(phone));

        // chrome.storage.sync.clear()

        // chrome.storage.sync.get(function(results) {
        //
        //     if (!results.hasOwnProperty('favorites')){
        //         chrome.storage.sync.set({'favorites': [phone]}, function() {
        //             // do sth after set, maybe alert
        //         });
        //     } else {
        //         if (results.favorites.indexOf(phone) === -1){
        //             const favorites = results.favorites.concat([phone]);
        //             chrome.storage.sync.set({'favorites': favorites}, function() {
        //                 //maybe alert user 'added'
        //             });
        //         }
        //     }
        // });
    };

    // once the "note" is clicked, saved the target restaurant in state,
    // get the note saved on chrome.storage.sync for that restaurant, set it to state also
    getNote(phone) {
        this.setState({selected: phone});

        chrome.storage.sync.get(function(notes) {
            if (notes.hasOwnProperty(phone)){
                this.setState({noteOnChromeStorage: notes})
            }
        });
    }

    takeNote(event) {
        event.preventDefault();
        this.setState({newNote: event.target.value});
    }

    saveNote(event) {
        event.preventDefault();

    }



    render() {
        const favorites = this.props.favorites;
        const restaurants = this.props.restaurants;
        const tooltip = <Tooltip id="add">Add to Favorite</Tooltip>;
        const popoverLeft = (
            <Popover id="popover-positioned-left" title="Tips">
                <form>
                    <textarea id="note" onChange={this.takeNote} defaultValue={this.state.noteOnChromeStorage}></textarea>
                    <p id="pop-over-buttons"><Button className="btn btn-danger">Close</Button><Button className="btn btn-info">Save</Button></p>
                </form>
            </Popover>
        );
        return  (
            <div>
                <section>
                    {
                        favorites && restaurants.map((restaurant,i) => {
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
                                                {
                                                    // if the restaurant is already in favorites, show the "note" button for memo
                                                    (favorites.indexOf(parseInt(restaurant.phone)) === -1) // restaurant not in favorites
                                                    ? (
                                                        <p>
                                                            <OverlayTrigger placement="left" overlay={tooltip}>
                                                                <Button onClick={() => this.addFavorite(parseInt(restaurant.phone.slice(1)))}><span className="glyphicon glyphicon-plus"></span>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </p>
                                                    )
                                                        // if the restaurant is not in the restaurant, show the "add" button
                                                    : (
                                                        <p>
                                                            <OverlayTrigger trigger="focus" placement="left" overlay={popoverLeft}>
                                                                <Button onClick={() => this.getNote(parseInt(restaurant.phone.slice(1)))}><span className="glyphicon glyphicon-edit"></span></Button>
                                                            </OverlayTrigger>
                                                        </p>
                                                    )
                                                }


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
        restaurants: state.result.restaurants,
        favorites: state.favorites.favorites
    }
};

export default connect(
    mapStateToProps,
    {},
)(Result)
