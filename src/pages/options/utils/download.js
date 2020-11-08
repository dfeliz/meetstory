
/**
 * 
 * @param {*} chat
 * @param {'txt' | 'pdf' | 'docx'} format 
 */
const downloadChat = (chat, format) => {
    const formattedChat = formatChatForDownload(chat)

    let blobType;
    switch (format) {
        case 'txt':
            blobType = 'text/plain;charset=utf-8';
            break;
        case 'pdf':
            blobType = 'application/pdf';
            break;
        case 'docx':
            blobType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        default:
            blobType = 'text/plain;charset=utf-8';
            break;
    }

    const file = new Blob([formattedChat], { type: blobType });
    const title = chat.title + "-" + chat.code + format;

    downloadFile(file, title)
}

const formatChatForDownload = (chat) => {
    const { messages, code, title, date } = chat;

    const messagesArray = messages
    const titleArray = [title, code, date]
    const concatArray = titleArray.concat(messagesArray)
    const completeArray = concatArray.reduce((r, a) => r.concat(a, "\r\n"), []);
    return completeArray
}

/**
 * 
 * @param {Blob} file
 * @param {'txt' | 'pdf' | 'docx'} format 
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
}
