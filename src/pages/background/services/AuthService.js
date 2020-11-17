import ChromeStorageService from './ChromeStorageService';

function auth() {
    return new Promise((resolve, reject) => {
        return chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve(token)
        })
    })
}

async function saveToken(token) {
    return ChromeStorageService.set({ gToken: token });
}

async function getToken() {
    return ChromeStorageService.get('gToken').then(({ gToken }) => {
        return gToken;
    })
}

function removeToken() {
    return new Promise((resolve, reject) => {
        return ChromeStorageService.set({ gToken: {} })
            .then(resolve)
            .catch(reject); 
    })
}

export default {
    auth,
    getToken,
    saveToken,
    removeToken,
}
