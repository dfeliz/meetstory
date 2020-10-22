
export async function getAllChats() {
    return setTimeout(() => {
        let res;
        chrome.runtime.sendMessage({ messageType: 'getAllChats', message: {} }, (response) => {
            res = response.message
        });
        return res;
    }, 250)
}
