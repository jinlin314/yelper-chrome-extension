/**
 * Created by jinlin on 6/15/17.
 */

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    result: require('./restaurant').default,
    favorites: require('./favorites').default,
})

export default rootReducer