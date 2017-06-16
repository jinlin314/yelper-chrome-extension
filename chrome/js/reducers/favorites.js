// /**
//  * Created by jinlin on 6/15/17.
//  */

// /* ------------------    ACTIONS    --------------------- */

const GET_ALL_FAVORITES = 'GET_ALL_FAVORITES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const CLOSE_FAVORITES = 'CLOSE_FAVORITES';

// /* --------------    ACTION CREATORS    ----------------- */

const getAll = (favorites) => ({ type: GET_ALL_FAVORITES, favorites });
const add = (target) => ({ type: ADD_FAVORITE, favorites });
const remove = (target) => ({ type: REMOVE_FAVORITE, favorites });
const closeFavorite = () => ({ type: CLOSE_FAVORITES});

/* ------------------    REDUCER    --------------------- */
const initial_state = {
    favorites: [],
    favorite: {},
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
            newState.favorite = action.favorite;
            break;
        case REMOVE_FAVORITE:
            newState.favorites = action.favorites;
            break;
        case CLOSE_FAVORITES:
            newState.showBool = false;
            break;
        default:
            return state
    }
    return newState
}


// /* ------------       DISPATCHERS     ------------------ */

// export const getAllFavorites = () => dispatch => {
//     // favorites = get from the chrome.storage
//     // dispatch(getALL(favorites)
// }
//
// export const addFavorite = (target) => dispatch => {
//     // favorites = get from the chrome.storage
//     // dispatch(add(target)
// }
