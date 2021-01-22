import store from './store'; // DO NOT TOUCH NEVER IN THE LIFE FOREVEL
import ChatService from './services/ChatService';
import AuthService from './services/AuthService';
import ListenerService from './services/ListenerService';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.messageType === 'create') {
            ChatService.createChat(request.message).then(sendResponse({ message: 'Chat successfully created' }));
        }
        else if (request.messageType === 'update') {
            ChatService.updateMessages(request.message).then(sendResponse({ message: 'Chat successfully updated' }))
        }
        else if (request.messageType === 'getAllChats') {
            ChatService.getAllChats().then(response => {
                sendResponse({ message: response });
            });
        }
        else if (request.messageType === 'getChat') {
            ChatService.getChat(request.message).then(response => sendResponse({ message: response }))
        }
        else if (request.messageType === 'toggleFavorite') {
            ChatService.toggleFavorite(request.message).then(sendResponse({ message: 'Toggle favorite' }))
        }
        else if (request.messageType === 'toggleDelete') {
            ChatService.toggleDelete(request.message).then(sendResponse({ message: 'Toggle delete' }))
        }
        else if (request.messageType === 'auth') {
            AuthService.auth({ interactive: true }).then((token) => sendResponse({ message: token }))
        }
        else if (request.messageType === 'checkAuth') {
            AuthService.auth({ interactive: false }).then((token) => sendResponse({ message: token }))
        }
        else if (request.messageType === 'removeToken') {
            AuthService.removeToken().then(() => sendResponse({ message: 'Token removed' }))
        }
        else if (request.messageType === 'getUrl') {
            ChatService.getUrl().then((url) => sendResponse({ message: url }))
        }
        else if (request.messageType === 'toggleAutoSave') {
            ChatService.toggleAutoSave(request.message).then((response) => sendResponse({ message: 'AutoSave status changed' }))
        }
        else if (request.messageType === 'getAutoSave') {
            ChatService.getAutoSave().then((AutoSave) => sendResponse({ message: AutoSave }))
        }
        else if (request.messageType === 'getTranslation') {
            ChatService.getTranslation().then((lenguage) => sendResponse({ message: lenguage }))
        }
        else if (request.messageType === 'saveTranslation') {
            ChatService.saveTranslation(request.message).then((response) => sendResponse({ message: 'Translation lenguage changed '}))
        }
        else if (request.messageType === 'listenTabClose') {
            ListenerService.listenTabClose(store).then(() => sendResponse({ message: 'Listening...' }))
        }
        else if (request.messageType === 'deleteChat') {
            ChatService.deleteChat(request.message).then(() => sendResponse({ message: `Delete done`}))
        }
        return true;
    });
