import ChatService from './services/ChatService';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.messageType === 'create') {
            ChatService.createChat(request.message).then(function() {
                return sendResponse('Chat successfully created');
            });
        }
        else if (request.messageType === 'update') {
            ChatService.updateMessages(request).then(function() {
                return sendResponse('Chat successfully updated');
            })
        }
        return true;
    });
