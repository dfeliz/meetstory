import ChromeStorageService from './ChromeStorageService';
import { v4 as uuidv4 } from 'uuid';
import { generateChat } from './helpers';

// @TODO: Remove console logs
async function createChat(data) {
    const newChat = generateChat(data);
    const newChatId = uuidv4();
    
    return ChromeStorageService.get('savedChats').then(({ savedChats }) => {
        console.log("TamoAqui:", savedChats)
        const updatedSavedChats = [
            ...savedChats,
            newChatId
        ]
        const newChatObj = { [newChatId]: newChat };

        ChromeStorageService.set({ savedChats: updatedSavedChats });
        ChromeStorageService.set(newChatObj);
        ChromeStorageService.set({ currentChat: newChatId });
    });
}

async function getAllChats() {
    return ChromeStorageService.get('savedChats').then(({ savedChats }) => {
        const allChats = savedChats.map(id => {
            return ChromeStorageService.get(id).then(({ chat }) => chat);
        })
        console.log("to lo chat:", allChats)
        return allChats;
    });
}

async function getChat(chatId) {
    return ChromeStorageService.get(chatId).then(({ chat }) => {
        console.log("Aqui ta el chat:", chat)
        return chat;
    });
}

async function updateMessages(messages) {
    return ChromeStorageService.get('currentChat').then(async ({currentChat}) => {
        return ChromeStorageService.get(currentChat).then((chatObj) => {
            const chat = chatObj[currentChat];
            chat.messages = messages;
            ChromeStorageService.set({ [currentChat]: chat });
            console.log('[ChatService]: ', messages, currentChat, chat);
        });
    });
}

async function toggleDelete(id) {
    const chat = await ChromeStorageService.get(id);
    chat.deleted = !chat.deleted;
    ChromeStorageService.set({ [id]: chat });
}

async function toggleFavorite(id) {
    const chat = await ChromeStorageService.get(id);
    chat.favorite = !chat.favorite;
    ChromeStorageService.set({ [id]: chat });
}

export default {
    createChat,
    updateMessages,
    toggleDelete,
    toggleFavorite
}
