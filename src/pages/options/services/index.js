
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
