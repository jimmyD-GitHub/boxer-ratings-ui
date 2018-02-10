import {combineReducers} from 'redux';

import {authentication} from './UserReducers';

const rootReducer = combineReducers({authentication});

export default rootReducer;