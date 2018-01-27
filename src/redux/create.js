import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import Immutable from 'immutable';

export default function createStore(history, client, data) {
    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        // const { persistState } = require('redux-devtools');
        finalCreateStore = composeWithDevTools(
            applyMiddleware(...middleware),
            // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }

    const reducer = require('./modules/reducer');
    // if (data) {
    //     data.pagination = Immutable.fromJS(data.pagination);
    // }
    const store = finalCreateStore(reducer, data);


    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer', () => {
            store.replaceReducer(require('./modules/reducer'));
        });
    }

    return store;
}
