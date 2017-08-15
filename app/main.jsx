import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import SOCKET from './socket'

import './index.scss'

import store from './store.jsx';
import Root from './components/Root';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Root />
        </Router>
    </Provider>,
    document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);