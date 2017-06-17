// /**
//  * Created by jinlin on 6/15/17.
//  */

// /* ------------------    ACTIONS    --------------------- */

const GET_ALL_FAVORITES = 'GET_ALL_FAVORITES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const GET_ALL_NOTES = 'GET_ALL_NOTES';
const SAVE_NOTE = 'SAVE_NOTE';

// /* --------------    ACTION CREATORS    ----------------- */

const getAll = (favorites) => ({ type: GET_ALL_FAVORITES, favorites });
const add = (favorites) => ({ type: ADD_FAVORITE, favorites });
const remove = (favorites) => ({ type: REMOVE_FAVORITE, favorites });
const getNotes = (notes) => ({type: GET_ALL_NOTES, notes});
const save = (note) => ({ type: SAVE_NOTE});

/* ------------------    REDUCER    --------------------- */
const initial_state = {
    favorites: [],
    notes: [],
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
        case SAVE_NOTE:
            newState.notes = action.notes;
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
                dispatch(getNotes([phone]));
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
            dispatch(getAll(results.favorites));
        } else {
            dispatch(getAllFavorites([]));
        }
    });
};

