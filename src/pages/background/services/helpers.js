
export function generateChat(data) {
    return {
        title: data.title,
        code: data.code,
        date: new Date(),
        messages: [],
        favorite: false,
        deleted: false,
    }
}
