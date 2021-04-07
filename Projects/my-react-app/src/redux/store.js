import { createStore, applyMiddleware, combineReducers } from 'redux';
import countReducer from './reducers/count';
import personReducer from './reducers/person';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const allReducer = combineReducers(
    {
        count: countReducer,
        person: personReducer
    }
)

export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));