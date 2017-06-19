// /**
//  * Created by jinlin on 6/15/17.
//  */

// /* ------------------    ACTIONS    --------------------- */

const GET_ALL_FAVORITES = 'GET_ALL_FAVORITES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const ADD_FAVORITE_RESTAURANT = 'ADD_FAVORITE_RESTAURANT';
const GET_FAVORITES_RESTAURANTS = 'GET_FAVORITES_RESTAURANTS';
const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
const UPDATE_FAVORITES_RESTAURANTS = 'UPDATE_FAVORITES_RESTAURANTS';
const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const GET_ALL_NOTES = 'GET_ALL_NOTES';
const GET_NOTE_FOR_RESTAURANT = 'GET_NOTE_FOR_RESTAURANT';
const SAVE_NOTE = 'SAVE_NOTE';

// /* --------------    ACTION CREATORS    ----------------- */

const getAll = (favorites) => ({ type: GET_ALL_FAVORITES, favorites });
const add = (favorites) => ({ type: ADD_FAVORITE, favorites });
const addFavRest = (favoriteRestaurants) => ({ type: ADD_FAVORITE_RESTAURANT, favoriteRestaurants });
const updateFav = (favorites) => ({type: UPDATE_FAVORITES, favorites});
const getFavRest = (favoriteRestaurants) => ({type: GET_FAVORITES_RESTAURANTS, favoriteRestaurants});
const updateFavRest = (favoriteRestaurants) => ({type: UPDATE_FAVORITES_RESTAURANTS, favoriteRestaurants});
export const showFavor = (showBool) => ({type: TOGGLE_FAVORITES, showBool});
const getNotes = (notes) => ({type: GET_ALL_NOTES, notes});
export const getNote = (note) => ({type: GET_NOTE_FOR_RESTAURANT, note});
const saveNote = (notes) => ({ type: SAVE_NOTE, notes});

/* ------------------    REDUCER    --------------------- */
const initial_state = {
    favorites: [],
    favoriteRestaurants: [],
    notes: {},
    note: '',
    showBool: false
};

export default function reducer(state = initial_state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case GET_ALL_FAVORITES:
            newState.favorites = action.favorites;
            break;
        case ADD_FAVORITE:
            newState.favorites = action.favorites;
            break;
        case ADD_FAVORITE_RESTAURANT:
            newState.favoriteRestaurants = action.favoriteRestaurants;
            break;
        case GET_FAVORITES_RESTAURANTS:
            newState.favoriteRestaurants = action.favoriteRestaurants;
            break;
        case UPDATE_FAVORITES:
            newState.favorites = action.favorites;
            break;
        case UPDATE_FAVORITES_RESTAURANTS:
            newState.favoriteRestaurants = action.favoriteRestaurants;
            break;
        case TOGGLE_FAVORITES:
            newState.showBool = action.showBool;
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

export const getFavoriteRestaurants = () => dispatch => {
    chrome.storage.sync.get(function(results) {
        if (results.hasOwnProperty('favoriteRestaurants')) {
            dispatch(getFavRest(results.favoriteRestaurants));
        } else {
            dispatch(getFavRest([]));
        }
    });
};

export const addFavorite = (phone, restaurant) => dispatch => {
    chrome.storage.sync.get(function(results) {

        if (!results.hasOwnProperty('favorites')){
            chrome.storage.sync.set({'favorites': [phone]}, function() {
                dispatch(add([phone]));
            });
            chrome.storage.sync.set({'favoriteRestaurants': [restaurant]}, function(){
                dispatch(addFavRest([restaurant]));
            });
        } else {
            if (results.favorites.indexOf(phone) === -1){
                const favorites = results.favorites.concat([phone]);
                chrome.storage.sync.set({'favorites': favorites}, function() {
                    dispatch(add(favorites));
                });
                const favRestaurants = results.favoriteRestaurants.concat([restaurant]);
                chrome.storage.sync.set({'favoriteRestaurants': favRestaurants}, function(){
                    dispatch(addFavRest(favRestaurants));
                });
            }
        }
    });
};

export const updateFavoriteRestaurants = (favorites, favoriteRestaurants) => dispatch => {
    chrome.storage.sync.set({'favorites': favorites}, function(){
        dispatch(updateFav(favorites));
    });
    chrome.storage.sync.set({'favoriteRestaurants': favoriteRestaurants}, function(){
        dispatch(updateFavRest(favoriteRestaurants));
    });
};



// =========== NOTES DISPATCHERS ================= //

export const getAllNotes = () => dispatch => {
    chrome.storage.sync.get(function(results) {
        if (results.hasOwnProperty('notes')) {
            dispatch(getNotes(results.notes));
        } else {
            dispatch(getNotes({}));
        }
    });
};

export const saveNoteForRestaurant = (phone, note) => dispatch => {
    const newNote = {};
    newNote[phone] = note;
    let notes;

    chrome.storage.sync.get(function(results) {
        if (!results.hasOwnProperty('notes')){
            notes = Object.assign(newNote);
        } else {
            console.log('prev notes', results.notes);
            notes = Object.assign(results.notes, newNote);
            console.log('after added note', notes);
        }
        chrome.storage.sync.set({'notes': notes}, function() {
            dispatch(saveNote(notes));
        });
    });
};