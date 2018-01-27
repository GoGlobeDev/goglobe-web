import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect
});
