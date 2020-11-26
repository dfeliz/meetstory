import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ToastProvider } from 'react-toast-notifications'
import './page.css';

async function initApp() {
    const mountNode = document.createElement('div');
    mountNode.style.height = '100vh';
    document.body.appendChild(mountNode);
    document.title = "Meetstory";

    ReactDOM.render(
        <ToastProvider autoDismiss>
            <App />
        </ToastProvider>, mountNode);
}

initApp();
