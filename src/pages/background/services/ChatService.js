import ChromeStorageService from './ChromeStorageService';
import { v4 as uuidv4 } from 'uuid';
import { generateChat } from './helpers';

// @TODO: Remove console logs
async function createChat(data) {
    console.log('[ChatService]: ', data);
    const newChat = generateChat(data);
    const newChatId = uuidv4();
    console.log('[ChatService]: ', newChatId);

    const savedChatsId = await ChromeStorageService.get('savedChats');
    console.log('[ChatService]: ', savedChatsId);

    const updatedSavedChats = {
        ...savedChatsId,
        newChatId
    }
    console.log('[ChatService]: ', updatedSavedChats);

    await ChromeStorageService.set({ [newChatId]: newChat });
    await ChromeStorageService.set({ savedChats: updatedSavedChats });
    await ChromeStorageService.set({ currentChat: newChatId });
}

async function updateMessages(messages) {
    const currentChatId = await ChromeStorageService.get('currentChat');
    const chat = await ChromeStorageService.get(currentChatId);
    chat.messages = messages;
    await ChromeStorageService.set({ [currentChatId]: chat });
    console.log('[ChatService]: ', messages, currentChatId, chat);
}

async function toggleDelete(id) {
    const chat = await ChromeStorageService.get(id);
    chat.deleted = !chat.deleted;
    await ChromeStorageService.set({ [id]: chat });
}

async function toggleFavorite(id) {
    const chat = await ChromeStorageService.get(id);
    chat.favorite = !chat.favorite;
    await ChromeStorageService.set({ [id]: chat });
}

export default {
    createChat,
    updateMessages,
    toggleDelete,
    toggleFavorite
}
