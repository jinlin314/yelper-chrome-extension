import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {geoFindMe, getNYCHealthRecords} from './reducers/restaurant';
import {getAllFavorites, getFavoriteRestaurants, getAllNotes} from './reducers/favorites';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            createLogger({collapsed: true})
        )
    )
);

export default store;

// get the location at start
store.dispatch(geoFindMe());
store.dispatch(getNYCHealthRecords());
store.dispatch(getFavoriteRestaurants());
store.dispatch(getAllFavorites());
store.dispatch(getAllNotes());