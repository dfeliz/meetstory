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

async function removeToken() {
    return ChromeStorageService.set({ gToken: {} });
}

export default {
    auth,
    getToken,
    saveToken,
    removeToken,
}
