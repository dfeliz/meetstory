import ChromeStorageService from './ChromeStorageService';

function auth({interactive = true}) {
    return new Promise((resolve, reject) => {
        return chrome.identity.getAuthToken({ 'interactive': interactive }, function (token) {
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve(token)
        })
    })
}

function removeToken() {
    return new Promise((resolve, reject) => {
        return ChromeStorageService.set({ gToken: {} })
            .then(() => {
                chrome.identity.clearAllCachedAuthTokens(resolve)
            })
            .catch(reject);
    })
}

export default {
    auth,
    removeToken,
}
