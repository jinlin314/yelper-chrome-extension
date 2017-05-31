/*
This file is NOT necessary to edit for the test specs
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';

require('../scss/main.scss');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);