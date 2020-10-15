import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

async function initApp() {
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(<App />, mountNode);
}

initApp();
