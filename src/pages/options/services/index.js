import { formatDate } from '../utils/date';

/////////////////////
// Chat services
/////////////////////

export function getAllChats() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'getAllChats' }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject([]);
            }
            resolve(response.message);
        });
    })
}

/**
 * Gets all chats then filters using the callback parameter.
 *
 * @param {function} callback
 * @returns {Array} array of chats (filtered)
 */
export function getFilteredChats(callback) {
    return getAllChats().then((response) => {
        const filteredChats = response.filter((chat) => {
            const chatProperties = Object.values(chat)[0];
            chatProperties.id = Object.keys(chat)[0];
            return callback(chatProperties);
        })

        const formattedChats = filteredChats.map((chat) => {
            const chatValue = Object.values(chat)[0];
            const chatId = Object.keys(chat)[0];
            chatValue.id = chatId;
            chatValue.formattedDate = formatDate(chatValue.date);
            return chatValue;
        })

        return formattedChats
    });
}

export function toggleChatDelete(id) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'toggleDelete', message: id }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`Couldn't delete chat id ${id}`);
            }
            resolve(response.message);
        });
    })
}

export function deleteChat(id) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'deleteChat', message: id }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`Couldn't delete chat id ${id}`);
            }
            resolve(response.message);
        });
    })
}

export function toggleChatFavorite(id) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'toggleFavorite', message: id }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`Couldn't toggle favorite chat id ${id}`);
            }
            resolve(response.message);
        });
    })
}


/////////////////////
// Google services
/////////////////////

export function auth() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'auth' }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`Couldn't authenticate because reasons. Response: `, response);
            }
            resolve({ success: true, token: response.message })
        })
    })
}

export function saveToken(token) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'saveToken', message: token }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`[ERROR] Token not saved.`);
            }
            resolve({ success: true })
        })
    })
}

export function checkAuth() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'checkAuth' }, (response) => {
            const token = response.message;
            if (typeof token === 'string' && token.length !== 0) {
                resolve(response.message);
            }
            reject('[checkAuth] Error. Please see services/checkAuth flow');
        })
    })
}

export function disconnect() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'removeToken' }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`Couldn't remove token because reasons. Response: `, response);
            }
            resolve({ success: true, response: response.message })
        })
    })
}

export function getAutoSave() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'getAutoSave' }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject("Couldn't get autosave status")
            }
            resolve(response.message);
        });
    })
}


export function toggleAutoSave(prevState) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'toggleAutoSave', message: prevState }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject("Couldn't change saved state");
            }
            console.log(response.message)
            resolve(response.message);
        });
    })
}


export function saveTranslation(translationLenguage) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'saveTranslation', message: translationLenguage }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject(`[ERROR] translation Lenguage not saved.`);
            }
            resolve({ success: true })
        })
    })
}

export function getTranslation() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'getTranslation' }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject("Couldn't get translation lenguaje")
            }
            resolve(response.message);
        });
    })
}
