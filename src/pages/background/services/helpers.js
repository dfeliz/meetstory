import { UNTITLED_MEETING } from '../constants'

const untitled = 'Detalles de la reunión';

export function generateChat(data) {
    return {
        title: data.title === untitled ? UNTITLED_MEETING : data.title,
        code: data.code,
        date: new Date().toString(),
        messages: [],
        favorite: false,
        deleted: false,
    }
}
