'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux'
import store from './store'

import App from './components/App';
import Result from './components/Result';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
