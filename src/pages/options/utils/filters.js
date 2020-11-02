
const nonDeleted = (chat) => chat.deleted === false;
const deleted = (chat) => chat.deleted === true;
const favorites = (chat) => chat.favorite === true && chat.deleted === false;

export {
    deleted,
    favorites,
    nonDeleted,
}
