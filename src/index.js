import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './models/reducers';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import * as serviceWorker from './serviceWorker';
import rootSaga from './controllers/sagas';
import logger from 'redux-logger';
import RouterContainer from './views/main-router/router.container';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';

library.add(faTimes, faCheck, faSquare);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <RouterContainer/>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
