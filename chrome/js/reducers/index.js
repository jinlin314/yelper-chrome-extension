/**
 * Created by jinlin on 6/15/17.
 */

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    restautantResults: require('./restaurant').default,

})

export default rootReducer