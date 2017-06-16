// /**
//  * Created by jinlin on 6/15/17.
//  */
import {browserHistory} from 'react-router';

// /* ------------------    ACTIONS    --------------------- */

const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'
const GET_RESTAURANTS_BY_CUISINE = 'GET_RESTAURANTS_BY_CUISINE'
const GET_RESTAURANTS_BY_PRICE = 'GET_RESTAURANTS_BY_PRICE'
const GET_RESTAURANTS_BY_REVIEWS = 'GET_RESTAURANTS_BY_REVIEWS'
const SELECT_RESTAURANT = 'SELECT_RESTAURANT'
const ADD_FAVORITE = 'ADD_FAVORITE'

// /* --------------    ACTION CREATORS    ----------------- */

const getAll = (restaurants) => ({ type: GET_ALL_RESTAURANTS, restaurants })
const getByCuisine = (restaurants) => ({ type: GET_RESTAURANTS_BY_CUISINE, restaurants })
const getByPrice = (restaurants) => ({ type: GET_RESTAURANTS_BY_PRICE, restaurants })
const getByReviews = (restaurants) => ({ type: GET_RESTAURANTS_BY_REVIEWS, restaurants })
const select = (restaurant) => ({ type: SELECT_RESTAURANT, restaurant })
const add = (restaurant) => ({ type: ADD_FAVORITE, restaurants })


/* ------------------    REDUCER    --------------------- */

export default function reducer(state = {restaurants: [], restaurant: null}, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case GET_ALL_RESTAURANTS:
            newState.restaurants = action.restaurants;
            break;
        case GET_RESTAURANTS_BY_CUISINE:
            newState.restaurants = action.restaurants;
            break;
        case GET_RESTAURANTS_BY_PRICE:
            newState.restaurants = action.restaurants;
            break;
        case GET_RESTAURANTS_BY_REVIEWS:
            newState.restaurants = action.restaurants;
            break;
        case SELECT_RESTAURANT:
            newState.restaurant = action.restaurant;
            break;
        case ADD_FAVORITE:
            newState.restaurant = action.restaurant;
            break;
        default:
            return state
    }
    return newState
}


// /* ------------       DISPATCHERS     ------------------ */
//
// export const getAllRestaurants = () => {
//     return dispatch => {
//         axios.get('/api/songs')
//             .then(response => {
//                 dispatch(receiveAllSongs(response.data));
//             });
//     };
// };