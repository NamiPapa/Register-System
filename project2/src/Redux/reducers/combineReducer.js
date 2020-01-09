import { combineReducers } from 'redux';
import list from './listReducer';
import soldier from './soldierReducer';

const reducers = combineReducers({
    list,
    soldier
})

export default reducers;
