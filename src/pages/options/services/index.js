
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
