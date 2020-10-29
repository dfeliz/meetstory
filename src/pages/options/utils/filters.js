
const nonDeleted = (chat) => chat.deleted === false;
const deleted = (chat) => chat.deleted === true;
const favorites = (chat) => chat.favorite === true;

export {
    deleted,
    favorites,
    nonDeleted,
}
