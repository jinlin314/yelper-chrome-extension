/**
 * Created by jinlin on 6/15/17.
 */

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    result: require('./restaurant').default,

})

export default rootReducer