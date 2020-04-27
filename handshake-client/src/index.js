/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render App component on the root element
// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, 
    document.getElementById('root'));
registerServiceWorker();
