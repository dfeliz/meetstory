import store from './store';
import ChatService from './services/ChatService';
import AuthService from './services/AuthService';

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
        else if (request.messageType === 'saveToken') {
            AuthService.saveToken(request.message).then(() => sendResponse({ message: 'Token saved'}))
        }
        else if (request.messageType === 'getToken') {
            AuthService.getToken().then((token) => sendResponse({ message: token }))
        }
        else if (request.messageType === 'removeToken') {
            AuthService.removeToken().then(() => sendResponse({ message: 'Token removed' }))
        }
        else if (request.messageType === 'deleteChat') {
            ChatService.deleteChat(request.message).then(() => sendResponse({ message: 'Chat deleted' }))
        }
        return true;
    });
