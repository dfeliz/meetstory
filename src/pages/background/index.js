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
        return true;
    });
