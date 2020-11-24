
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
            return callback(chatProperties);
        })

        return filteredChats
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

export function getToken() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ messageType: 'getToken' }, (response) => {
            resolve(response.message)
        })
    })
}

export function checkAuth() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'checkAuth' }, (response) => {
            console.log('responseeeeeeeeeeeee')
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
