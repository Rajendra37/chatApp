import {createStore} from 'redux'
import rootReducer from './Reducer/Main-Redux';

const store =createStore(rootReducer);

export default store;