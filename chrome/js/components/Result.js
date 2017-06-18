/**
 * Created by jinlin on 6/15/17.
 */

import React, {Component} from 'react';
import {Modal, Table, OverlayTrigger, Tooltip, ButtonToolbar, Image, Panel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import store from '../store';
import {addFavorite, getAllNotes, getNoteForRestaurant, saveNoteForRestaurant} from '../reducers/favorites';

export class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            noteOnChromeStorage: '',
            newNote: 'oldNotes',
            show: false
        };

        this.addFavorite = this.addFavorite.bind(this);
        this.getNote = this.getNote.bind(this);
        this.takeNote = this.takeNote.bind(this);
    }

    componentWillReceiveProps(newProps, oldProps) {
        this.setState({
            favorites: newProps.favorites,
            noteOnChromeStorage: newProps.noteOnChromeStorage,
            newNote: newProps.newNote
        })
    }

    // use the restaurants' phone numbers as the keys, since they are unique
    addFavorite(phone) {
        chrome.storage.sync.clear();
        store.dispatch(addFavorite(phone));
    };

    getNote(phone) {
        store.dispatch(getAllNotes());
        this.setState({ show: true });
        this.setState({selected: phone});
        store.dispatch(getNoteForRestaurant(phone));
    }

    // get the note from textArea, save it to the state
    takeNote(event) {
        this.setState({newNote: event.target.value});
    }

    saveNote(phone) {
        store.dispatch(saveNoteForRestaurant(phone, this.state.newNote));
        this.setState({ show: false });
    }

    render() {
        console.log(this.state.newNote);

        const favorites = this.props.favorites;
        const restaurants = this.props.restaurants;
        const tooltip = <Tooltip id="add">Add to Favorite</Tooltip>;

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
                                                        <div>
                                                            <OverlayTrigger placement="left" overlay={tooltip}>
                                                                <Button onClick={() => this.addFavorite(parseInt(restaurant.phone.slice(1)))}><span className="glyphicon glyphicon-plus"></span>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    )
                                                        // if the restaurant is not in the restaurant, show the "add" button
                                                    : (
                                                        <div>
                                                            <ButtonToolbar>
                                                                <Button bsStyle="primary" onClick={() => this.getNote(parseInt(restaurant.phone.slice(1)))}>
                                                                    <span className="glyphicon glyphicon-edit"></span>
                                                                </Button>

                                                                <Modal
                                                                    show={this.state.show}
                                                                    onHide={this.hideModal}
                                                                    dialogClassName="custom-modal"
                                                                >
                                                                    <Modal.Header>
                                                                        <Modal.Title id="contained-modal-title-md">{restaurant.name}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <form>
                                                                            <textarea id="note" onChange={this.takeNote} defaultValue={this.state.noteOnChromeStorage}></textarea>
                                                                        </form>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button onClick={() => this.saveNote(parseInt(restaurant.phone.slice(1)))}>Save</Button>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </ButtonToolbar>
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
        favorites: state.favorites.favorites,
        noteOnChromeStorage: state.favorites.note,
        allNotes: state.favorites.notes,
    }
};

export default connect(
    mapStateToProps,
    {},
)(Result)
