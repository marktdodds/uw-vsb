import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from "react-redux";
import reducers from './models/reducers';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import MainRouter from './views/main-router/main-router';
import * as serviceWorker from './serviceWorker';
import rootSaga from './controllers/sagas';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MainRouter/>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
