import UserReducer from "./UserReducer";
import ChatReducer from './ChatReducer'
import {socketReducer} from './socketreducer'

import {combineReducers} from 'redux'

const rootReducer=combineReducers({
    UserReducer,
    ChatReducer
})

export default rootReducer;