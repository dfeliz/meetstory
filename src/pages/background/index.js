import store from './store';
import {incrementBackgroundCounter, decrementBackgroundCounter} from './actions';

// increment or decrement background counter every second
setInterval(() => {
    store.dispatch(Math.random() >= 0.5 ?
        incrementBackgroundCounter() :
        decrementBackgroundCounter()
    );
    chrome.tabs.getCurrent(function (tab) {
        console.log(tab)
    });
}, 1000);