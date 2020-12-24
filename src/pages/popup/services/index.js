
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
