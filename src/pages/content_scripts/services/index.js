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

export function listenTabClose() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'listenTabClose' }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject("[sendToListener]: Error.")
            }
            resolve(response.message);
        });
    })
}

export function deleteChatIfEmpty(id) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ messageType: 'deleteChatIfEmpty', message: id }, (response) => {
            if (response.message === undefined || response.message === null) {
                reject("[deleteChatIfEmpty]: Error.")
            }
            resolve(response.message);
        });
    })  
}
