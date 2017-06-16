// /**
//  * Created by jinlin on 6/15/17.
//  */
import yelp from 'yelp-fusion';
import {clientId, clientSecret} from '../secret'

// /* ------------------    ACTIONS    --------------------- */

const GET_RESTAURANTS_BY_KEYWORDS = 'GET_RESTAURANTS_BY_KEYWORDS';
const GET_RESTAURANTS_BY_DELIVERY = 'GET_RESTAURANTS_BY_DELIVERY';
const GET_RESTAURANTS_BY_BUSINESS = 'GET_RESTAURANTS_BY_BUSINESS';
const GET_RESTAURANTS_REVIEWS = 'GET_RESTAURANTS_REVIEWS';
const SELECT_RESTAURANT = 'SELECT_RESTAURANT';
const ADD_FAVORITE = 'ADD_FAVORITE';
const GET_LOCATION = 'GET_LOCATION';

// /* --------------    ACTION CREATORS    ----------------- */

const getByKeywords = (restaurants) => ({ type: GET_RESTAURANTS_BY_KEYWORDS, restaurants });
const getByDelivery = (restaurants) => ({ type: GET_RESTAURANTS_BY_DELIVERY, restaurants });
const getReviews = (reviews) => ({ type: GET_RESTAURANTS_REVIEWS, reviews });
const select = (restaurant) => ({ type: SELECT_RESTAURANT, restaurant });
const add = (restaurant) => ({ type: ADD_FAVORITE, restaurants });
const locate = (location) => ({ type: GET_LOCATION, location});

/* ------------------    REDUCER    --------------------- */

export default function reducer(state = {restaurants: [], restaurant: null, location: null, reviews: []}, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case GET_RESTAURANTS_BY_KEYWORDS:
            newState.restaurants = action.restaurants;
            break;
        case GET_RESTAURANTS_BY_DELIVERY:
            newState.restaurants = action.restaurants;
            break;
        case GET_RESTAURANTS_REVIEWS:
            newState.reviews = action.reviews;
            break;
        case SELECT_RESTAURANT:
            newState.restaurant = action.restaurant;
            break;
        case ADD_FAVORITE:
            newState.restaurant = action.restaurant;
            break;
        case GET_LOCATION:
            newState.location = action.location;
            break;
        default:
            return state
    }
    return newState
}


// /* ------------       DISPATCHERS     ------------------ */

export const geoFindMe = () => dispatch => {

    const success = (position) => {
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude;
        const location = [latitude, longitude];
        dispatch(locate(location));
    };

    const error = () => {
        dispatch(locate(null));
    };

    navigator.geolocation.getCurrentPosition(success, error);
};

export const yelpSearch = (keywords, filterType, location) => dispatch => {
    // authenticate with yelp API, obtain an access token
    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        if (filterType === 'delivery') {
            client.transactionSearch('delivery', {
                location: location
            }).then(response => {
                const restaurants = response.jsonBody.businesses
                console.log(restaurants);
                dispatch(getByDelivery(restaurants))
            }).catch(e => {
                console.log(e);
            });
        } else if (filterType === 'reviews') {
            client.reviews(keywords).then(response => {
                const reviews = response.jsonBody.reviews;
                console.log(reviews);
                dispatch(getReviews(reviews));
            }).catch(e => {
                console.log(e);
            });
        } else { // search by keywords restaurants nearby
            const searchRequest = {
                term: keywords,
                location: location
            };
            client.search(searchRequest).then(response => {
                const restaurants = response.jsonBody.businesses;
                console.log(restaurants);
                dispatch(getByKeywords(restaurants))
            })
        }
    }).catch(e => {
        console.log(e);
    });
}
