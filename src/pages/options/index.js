import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './page.css';

async function initApp() {
    const mountNode = document.createElement('div');
    mountNode.style.height = '100vh';
    document.body.appendChild(mountNode);
    document.title = "Meetstory";

    ReactDOM.render(<App />, mountNode);
}

initApp();
