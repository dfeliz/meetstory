import { formatChat } from './download'
import { checkAuth } from '../services';

const uploadFile = (chatData, token) => {
    const { code, title } = chatData;

    const form = new FormData();

    const messages = formatChat(chatData)

    const metadata = {
        'name': `Meetstory de ${title} - ${code}`,
        'mimeType': 'text/plain',
    };

    form.append('', new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' }));
    form.append('', new Blob([messages], { type: 'text/plain' }));

    const requestOptions = {
        method: 'POST',
        headers: new Headers({
            "Authorization": "Bearer " + token,
        }),
        body: form, // insert form 
    };


    fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("This is a result: ", result)
        })
        .catch(error => console.log('error', error));
}

const fetchToken = () => {
    return checkAuth().then((token) => {
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
