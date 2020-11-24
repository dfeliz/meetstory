import { formatChat } from './download'
import { getToken } from '../services';

const uploadFile = (chatData, token) => {
    const { code, title } = chatData;
    
    const messages = formatChat(chatData)

    console.log("here is the token: ", "Bearer " + token)
    console.log("this is the chat: ", messages)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: messages,
      redirect: 'follow'
    };


    fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("This is a result: ", result)
            const fileInfo = result.id
            console.log(fileInfo)

            requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: {"title": `${code}-${title}`, "mimeType": "text/plain"},
                redirect: 'follow'
            };
        
            fetch(`https://www.googleapis.com/drive/v2/files/${fileInfo}`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        })
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
