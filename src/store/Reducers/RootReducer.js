import {combineReducers} from 'redux';

import {authentication, registration} from './UserReducers';

const rootReducer = combineReducers({authentication, registration});

export default rootReducer;