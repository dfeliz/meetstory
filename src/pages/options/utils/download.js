import { createPdf } from './pdf';

/**
 * 
 * @param {*} chat
 * @param {'txt' | 'pdf'} format 
 */
const downloadChat = (chat, format) => {
    const formattedChat = formatChat(chat)
    const title = chat.title + "-" + chat.code;
    let file;
    
    switch (format) {
        case 'pdf':
            file = createPdf([formattedChat]);
            file.download(title);
            break;
        default:
            file = new Blob([formattedChat], { type: 'text/plain;charset=utf-8' });
            downloadFile(file, title)
            break;
    }
}

const formatChat = (chat) => {
    const { messages, code, title, date } = chat;

    const chatData = [title, code, date, ...messages];
    const formattedChat = chatData.join('\r\n');

    return formattedChat
}

/**
 * 
 * @param {Blob} file
 * @param {string} fileTitle 
 */
const downloadFile = (file, fileTitle) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = fileTitle;
    document.body.appendChild(element);
    element.click();
}

export {
    downloadChat,
    formatChat,
}
