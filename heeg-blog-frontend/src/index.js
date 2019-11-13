import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from '@redux-saga/core';
import { tempSetUser } from './modules/user';
import { check } from './lib/api/auth';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const loadUser = () => {
    try {
        const user = localStorage.getItem('user');
        if (!user) return;

        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    } catch (e) {
        console.log('Unable to access the local storage.');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
