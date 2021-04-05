import { createStore, applyMiddleware } from 'redux';
import countReducer from './reducers/count';
import thunk from 'redux-thunk';

export default createStore(countReducer, applyMiddleware(thunk));