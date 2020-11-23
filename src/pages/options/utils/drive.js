import { formatChat } from './download'
import { getToken } from '../services';

const uploadFile = (chatData, fileType, token) => {
    const { messages, code, title } = chatData;

    const options = {
        "name": title + "-" + code,
        "parents": ["1K_HIcRZnZl7L8S5gaa_78DvZA5Jb6AuD"],
        "mimeType": fileType
    }
    const chat = formatChat(messages)

    console.log("here is the token: ", "Bearer " + token)
    console.log("here is the options: ", options)
    console.log("this is the chat: ", chat)
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "");
    myHeaders.append("Authorization", "Bearer " + token)

    var formdata = new FormData();
    formdata.append("", options, "upload-options");
    formdata.append("", chat, "chat.txt");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

const fetchToken = () => {
    return getToken().then((token) => {
        if (typeof token === 'string' && token.length !== 0) {
            console.log("I got the token: ", token)
            return token
        }
        else {
            console.log("You are not signed in(there is no token saved)")
        }
    })
}

export {
    fetchToken,
    uploadFile
}
