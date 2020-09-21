import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';
import App from './app';

async function initApp() {
    const store = await createUIStore();

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
    document.body.style.backgroundColor = "#F2F2F2",
    document.body.style.margin = 0,

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        mountNode
    );
}

initApp();
