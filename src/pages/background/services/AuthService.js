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
        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
            // Use the token.
            if (token) {
                  // Make a request to revoke token
                  var xhr = new XMLHttpRequest();
                  xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
                       token);
                  xhr.send();
             }
            chrome.identity.removeCachedAuthToken(
                { 'token': token }, function () {
                    resolve()
                })
          });
    })
}



export default {
    auth,
    removeToken,
}
