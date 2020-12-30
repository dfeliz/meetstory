
const get = key =>
    new Promise((resolve, reject) =>
        chrome.storage.local.get(key, result =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve(result)
        )
    )

const set = data =>
    new Promise((resolve, reject) =>
        chrome.storage.local.set(data, () =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve()
        )
    )
const remove = key =>
    new Promise((resolve, reject) =>
        chrome.storage.local.remove(key, () =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve()
        )
    )

export default {
    get,
    set,
    remove,
}
