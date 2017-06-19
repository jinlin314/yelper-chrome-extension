// /**
//  * Created by jinlin on 6/15/17.
//  */
import axios from 'axios';
import yelp from 'yelp-fusion';
import {clientId, clientSecret} from '../secret'

// /* ------------------    ACTIONS    --------------------- */

const GET_RESTAURANTS_NEARBY = 'GET_RESTAURANTS_BY_NEARBY';
const GET_RESTAURANTS_BY_KEYWORDS = 'GET_RESTAURANTS_BY_KEYWORDS';
const GET_RESTAURANTS_BY_DELIVERY = 'GET_RESTAURANTS_BY_DELIVERY';
const GET_RESTAURANTS_BY_BUSINESS = 'GET_RESTAURANTS_BY_BUSINESS';
const GET_RESTAURANTS_REVIEWS = 'GET_RESTAURANTS_REVIEWS';
const SELECT_RESTAURANT = 'SELECT_RESTAURANT';
const GET_LOCATION = 'GET_LOCATION';
const FETCH_NYC_RECORDS = 'FETCH_NYC_RECORDS';
const GET_GRADES_FOR_RESTAURANT = 'GET_GRADES_FOR_RESTAURANT';

// /* --------------    ACTION CREATORS    ----------------- */

const getNearBy = (restaurants) => ({ type: GET_RESTAURANTS_NEARBY, restaurants });
const getByKeywords = (restaurants) => ({ type: GET_RESTAURANTS_BY_KEYWORDS, restaurants });
const getByDelivery = (restaurants) => ({ type: GET_RESTAURANTS_BY_DELIVERY, restaurants });
const getReviews = (reviews) => ({ type: GET_RESTAURANTS_REVIEWS, reviews });
const select = (restaurant) => ({ type: SELECT_RESTAURANT, restaurant });
const locate = (location) => ({ type: GET_LOCATION, location});
const fetchRecords = (nycRecords) => ({type: FETCH_NYC_RECORDS, nycRecords});
export const getGrades = (grades) => ({type: GET_GRADES_FOR_RESTAURANT, grades});

/* ------------------    REDUCER    --------------------- */
const initial_state = {
    restaurants: [],
    favoriteRestaurants: [],
    restaurant: null,
    location: null,
    reviews: [],
    search: false,
    nycRecords: [],
    grade: []
};

export default function reducer(state = initial_state, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case GET_RESTAURANTS_NEARBY:
            newState.restaurants = action.restaurants;
            break;
        case GET_RESTAURANTS_BY_KEYWORDS:
            newState.restaurants = action.restaurants;
            newState.search = true;
            break;
        case GET_RESTAURANTS_BY_DELIVERY:
            newState.restaurants = action.restaurants;
            newState.search = true;
            break;
        case GET_RESTAURANTS_REVIEWS:
            newState.reviews = action.reviews;
            newState.search = true;
            break;
        case SELECT_RESTAURANT:
            newState.restaurant = action.restaurant;
            newState.search = true;
            break;
        case GET_LOCATION:
            newState.location = action.location;
            break;
        case FETCH_NYC_RECORDS:
            newState.nycRecords = action.nycRecords;
            break;
        case GET_GRADES_FOR_RESTAURANT:
            newState.grades = action.grades;
            break;
        default:
            return state;
    }
    return newState;
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

export const getNYCHealthRecords = () => dispatch => {
    axios.get('https://data.cityofnewyork.us/api/views/43nn-pn8j/rows.json')
        .then(res => res.data)
        .then(data => dispatch(fetchRecords(data.data)))
        .catch(console.error);
};

// export const getGradeForRestaurant = (phone) => dispatch => {
//
// };

export const yelpSearch = (keywords, filterType, location) => dispatch => {
    // authenticate with yelp API, obtain an access token
    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        if (filterType === 'delivery') {
            client.transactionSearch('delivery', {
                location: location
            }).then(response => {
                const restaurants = response.jsonBody.businesses
                dispatch(getByDelivery(restaurants))
            }).catch(e => {
                console.log(e);
            });
        } else if (filterType === 'reviews') {
            client.reviews(keywords).then(response => {
                const reviews = response.jsonBody.reviews;
                dispatch(getReviews(reviews));
            }).catch(e => {
                console.log(e);
            });
        } else if (filterType === 'keywords') {
            const searchRequest = {
                term: keywords,
                location: location
            };
            client.search(searchRequest).then(response => {
                const restaurants = response.jsonBody.businesses;
                dispatch(getByKeywords(restaurants))
            })
        }else { // search nearby restaurants nearby
            const searchRequest = {
                term: "restaurant",
                location: location
            };
            client.search(searchRequest).then(response => {
                const restaurants = response.jsonBody.businesses;
                dispatch(getNearBy(restaurants))
            })
        }
    }).catch(e => {
        console.log(e);
    });
};

