import { toggleSave } from '../actions';

const tabs = {};
const urlRegex = /https?:\/\/([^\.]+\.)?meet.google.com/;
let store;

function listenTabClose(objStore) {
    store = objStore;

    const onUpdatedListener = chrome.tabs.onUpdated.addListener(function(tabId, info) {
        chrome.tabs.get(tabId, function(tab) {
            tabs[tabId] = tab.url;
            console.log(tabs);
        });
    });

    const onRemovedListener = chrome.tabs.onRemoved.addListener(function(tabId) {
        const tabUrl = tabs[tabId];
        if (urlRegex.test(tabUrl)) {
            store.dispatch(toggleSave());
            chrome.tabs.onUpdated.removeListener(onUpdatedListener);
            chrome.tabs.onRemoved.removeListener(onRemovedListener);
        }
    });
}

export default {
    listenTabClose,
}
