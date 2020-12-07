import ChromeStorageService from './ChromeStorageService';
import { v4 as uuidv4 } from 'uuid';
import { generateChat } from './helpers';

async function createChat(data) {
    const newChat = generateChat(data);
    const newChatId = uuidv4();

    return ChromeStorageService.get('savedChats').then(({ savedChats }) => {
        console.log("TamoAqui:", savedChats)

        if (!Array.isArray(savedChats)) {
            savedChats = [];
        }
        
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
    const { savedChats } = await ChromeStorageService.get('savedChats');

    const savedDataChats = [];

    if (savedChats === undefined || savedChats.length === 0) {
        return savedDataChats;
    }

    for (let chatCounter = 0; chatCounter < savedChats.length; chatCounter++) {
        const getChatDetail = await ChromeStorageService.get(savedChats[chatCounter]);
        savedDataChats.push(getChatDetail);
    }

    return savedDataChats;
}

async function getChat(chatId) {
    return ChromeStorageService.get(chatId).then(({ chat }) => {
        console.log("Aqui ta el chat:", chat)
        return chat;
    });
}

async function updateMessages(messages) {
    return ChromeStorageService.get('currentChat').then(async ({ currentChat }) => {
        return ChromeStorageService.get(currentChat).then((chatObj) => {
            const chat = chatObj[currentChat];
            chat.messages = messages;
            ChromeStorageService.set({ [currentChat]: chat });
            console.log('[ChatService]: ', messages, currentChat, chat);
        });
    });
}

async function toggleDelete(id) {
    return ChromeStorageService.get(id).then((chatObj) => {
        const chat = Object.values(chatObj)[0];
        chat.deleted = !chat.deleted;
        ChromeStorageService.set({ [id]: chat });
    });
}

async function toggleFavorite(id) {
    return ChromeStorageService.get(id).then((chatObj) => {
        const chat = Object.values(chatObj)[0];
        chat.favorite = !chat.favorite;
        ChromeStorageService.set({ [id]: chat });
    });
}

function getUrl() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
            const url = tabs[0].url;
            console.log("I have the url: ", url)
            resolve(url)
        })
    })
}

async function toggleAutoSave(prevState) {
    await ChromeStorageService.set({ ['AutoSave']: !prevState });
    return getAutoSave();
    
}

async function getAutoSave() {
    return ChromeStorageService.get('AutoSave').then(({ AutoSave }) => {
        console.log("Aqui ta el AutoSave: ", AutoSave)
        return AutoSave;
    });
}

export default {
    createChat,
    getUrl,
    updateMessages,
    toggleDelete,
    toggleFavorite,
    getAllChats,
    getChat,
    toggleAutoSave,
    getAutoSave,
}
