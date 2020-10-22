import store from './store';
import ChatService from './services/ChatService';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.messageType === 'create') {
            ChatService.createChat(request.message).then(sendResponse({ message: 'Chat successfully created' }));
        }
        else if (request.messageType === 'update') {
            ChatService.updateMessages(request.message).then(sendResponse({ message: 'Chat successfully updated' }))
        }
        else if (request.messageType === 'getAllChats') {
            ChatService.getAllChats().then(response => sendResponse({ message: response }))
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
        return true;
    });
