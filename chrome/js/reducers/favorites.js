// /**
//  * Created by jinlin on 6/15/17.
//  */

// /* ------------------    ACTIONS    --------------------- */

const GET_ALL_FAVORITES = 'GET_ALL_FAVORITES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const GET_ALL_NOTES = 'GET_ALL_NOTES';
const GET_NOTE_FOR_RESTAURANT = 'GET_NOTE_FOR_RESTAURANT'
const SAVE_NOTE = 'SAVE_NOTE';

// /* --------------    ACTION CREATORS    ----------------- */

const getAll = (favorites) => ({ type: GET_ALL_FAVORITES, favorites });
const add = (favorites) => ({ type: ADD_FAVORITE, favorites });
const remove = (favorites) => ({ type: REMOVE_FAVORITE, favorites });
const getNotes = (notes) => ({type: GET_ALL_NOTES, notes});
const getNote = (note) => ({type: GET_NOTE_FOR_RESTAURANT, note});
const saveNote = (notes) => ({ type: SAVE_NOTE, notes});

/* ------------------    REDUCER    --------------------- */
const initial_state = {
    favorites: [],
    notes: {},s
    note: '',
    showBool: false
};

export default function reducer(state = initial_state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case GET_ALL_FAVORITES:
            newState.favorites = action.favorites;
            newState.showBool = true;
            break;
        case ADD_FAVORITE:
            newState.favorites = action.favorites;
            break;
        case REMOVE_FAVORITE:
            newState.favorites = action.favorites;
            break;
        case GET_ALL_NOTES:
            newState.notes = action.notes;
            break;
        case GET_NOTE_FOR_RESTAURANT:
            newState.note = action.note;
            break;
        case SAVE_NOTE:
            newState.note = action.note;
            break;
        default:
            return state
    }
    return newState
}


// /* ------------       DISPATCHERS     ------------------ */

export const getAllFavorites = () => dispatch => {
    chrome.storage.sync.get(function(results) {
        if (results.hasOwnProperty('favorites')) {
            dispatch(getAll(results.favorites));
        } else {
            dispatch(getAll([]));
        }
    });
};

export const addFavorite = (phone) => dispatch => {
    chrome.storage.sync.get(function(results) {

        if (!results.hasOwnProperty('favorites')){
            chrome.storage.sync.set({'favorites': [phone]}, function() {
                dispatch(add([phone]));
            });
        } else {
            if (results.favorites.indexOf(phone) === -1){
                const favorites = results.favorites.concat([phone]);
                chrome.storage.sync.set({'favorites': favorites}, function() {
                    dispatch(add(favorites));
                });
            }
        }
    });
};

export const getAllNotes = () => dispatch => {
    chrome.storage.sync.get(function(results) {
        if (results.hasOwnProperty('notes')) {
            dispatch(getNotes(results.notes));
        } else {
            dispatch(getNotes({}));
        }
    });
};

export const getNoteForRestaurant = (phone) => dispatch => {
    chrome.storage.sync.get(function(notes) {
        if (notes.hasOwnProperty(notes)){
            dispatch(getNote(notes.phone));
        } else {
            dispatch(getNote(''));
        }
    });
};

export const saveNoteForRestaurant = (phone, note) => dispatch => {
    chrome.storage.sync.get(function(results) {
        if (!results.hasOwnProperty('notes')){
            var notesTemp = {};
        } else {
            var notesTemp = results.notes;
        }
        notesTemp[phone] = note;
        chrome.storage.sync.set({'notes': notesTemp}, function() {
            dispatch(saveNote(notesTemp));
        });
    });
};
