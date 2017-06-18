/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {Modal, Well, Table, OverlayTrigger, Tooltip, ButtonToolbar, Image, Panel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import store from '../store';
import {getAllFavorites, addFavorite, getNote, getAllNotes, saveNoteForRestaurant, updateFavoriteRestaurants} from '../reducers/favorites';

export class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNote: '',
            showNote: false,
            selectedRestaurant: {}
        };

        this.addFavorite = this.addFavorite.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
        this.getNote = this.getNote.bind(this);
        this.takeNote = this.takeNote.bind(this);
    }

    componentWillReceiveProps(newProps, oldProps) {
        this.setState({
            favorites: newProps.favorites,
            favoriteRestaurants: newProps.favoriteRestaurants,
            allNotes: newProps.allNotes
        })
    }

    // use the restaurants' phone numbers as the keys, since they are unique
    addFavorite(phone, restaurant) {
        // chrome.storage.sync.clear();
        store.dispatch(addFavorite(phone, restaurant));
    };

    deleteFavorite(index, phone) {
        console.log("target: ", phone);
        console.log('fav: ', this.props.favorites[index]);
        console.log('favRes: ', this.props.favoriteRestaurants[index]);

        const favorites = this.props.favorites.slice(0, index).concat(this.props.favorites.slice(index+1));
        const favoriteRestaurants = this.props.favoriteRestaurants.slice(0, index).concat(this.props.favoriteRestaurants.slice(index+1));
        store.dispatch(updateFavoriteRestaurants(favorites, favoriteRestaurants));
    }

    getNote(phone, restaurant) {
        this.setState({selectedRestaurant: restaurant});
        this.setState({ showNote: true });
        const notes = this.props.allNotes;
        if (notes.hasOwnProperty(phone)) {
            store.dispatch(getNote(notes[phone]));
        }
    }

    // get the note from textArea, save it to the state
    takeNote(event) {
        this.setState({newNote: event.target.value});
    }

    saveNote(phone) {
        store.dispatch(saveNoteForRestaurant(phone, this.state.newNote));
        store.dispatch(getAllNotes());
        this.setState({ showNote: false });
    }

    render() {
        const favorites = this.props.favorites;
        let restaurants;
        if (this.props.showBool) {
            restaurants = this.props.favoriteRestaurants;
        } else {
            restaurants = this.props.restaurants;
        }
        const tooltip = <Tooltip id="add">Add to Favorite</Tooltip>;

        return  (
            <div>
                <section>
                    {
                        (this.props.showBool)
                            ? (
                            <Well bsStyle="small">
                                <span className="glyphicon glyphicon-star-empty"> <strong>My Favorites Eaters</strong> </span>

                            </Well>
                        )
                            : <div></div>
                    }
                    {
                        favorites && restaurants.map((restaurant,index) => {
                            return (
                                <div key={index}>
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
                                                        <div>
                                                            <OverlayTrigger placement="left" overlay={tooltip}>
                                                                <Button onClick={() => this.addFavorite(parseInt(restaurant.phone.slice(1)), restaurant)}><span className="glyphicon glyphicon-plus"></span>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    )
                                                        // if the restaurant is not in the restaurant, show the "add" button
                                                    : (
                                                        <div>
                                                            <ButtonToolbar>
                                                                <Button bsStyle="primary" onClick={() => this.getNote(parseInt(restaurant.phone.slice(1)), restaurant)}>
                                                                    <span className="glyphicon glyphicon-edit"></span>
                                                                </Button>

                                                                <Modal
                                                                    show={this.state.showNote}
                                                                    onHide={this.hideModal}
                                                                    dialogClassName="custom-modal"
                                                                >
                                                                    <Modal.Header>
                                                                        <Modal.Title id="contained-modal-title-md">{this.state.selectedRestaurant.name}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <form>
                                                                            <textarea id="note" onChange={this.takeNote} defaultValue={this.props.note}></textarea>
                                                                        </form>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button onClick={() => this.saveNote(parseInt(this.state.selectedRestaurant.phone.slice(1)))}>Save</Button>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </ButtonToolbar>
                                                            {
                                                                (this.props.showBool)
                                                                    ? <Button bsStyle="primary" onClick={()=>this.deleteFavorite(index, restaurant.phone)}>
                                                                    <span className="glyphicon glyphicon-trash"></span>
                                                                </Button>
                                                                    : <div></div>
                                                            }
                                                        </div>

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
        favoriteRestaurants: state.favorites.favoriteRestaurants,
        favorites: state.favorites.favorites,
        showBool: state.favorites.showBool,
        note: state.favorites.note,
        allNotes: state.favorites.notes,
    }
};

export default connect(
    mapStateToProps,
    {},
)(Result)
