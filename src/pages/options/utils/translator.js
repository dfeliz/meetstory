import { formatChat, downloadChat } from './download'
import { checkAuth } from '../services';

const translateText = (chatData, sourceLenguage, targetLenguage, token) => {

	const messages = formatChat(chatData)
	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json; charset=utf-8");

	var requestBody = {
		"q": messages,
		"source": sourceLenguage,
		"target": targetLenguage
	}
	
	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: JSON.stringify(requestBody),
	  redirect: 'follow'
	};

	fetch("https://translation.googleapis.com/language/translate/v2?key=AIzaSyCU3i1bxE32OTmhWvDPZ2HIzPtuW5i7nwc", requestOptions)
	.then(response => {
		return response.json()
	}).then(response => {
		console.log(response)
		chatData.messages = response.data.translations.map((translation) => translation.translatedText)
		downloadChat(chatData)
	})
	.catch(err => {
		console.error(err);
	});
    
}

const getLenguages = () => {
    fetch("https://translation.googleapis.com/language/translate/v2", {
	"method": "GET",
	"headers": {
		"accept-encoding": "application/gzip",
		"x-rapidapi-key": "238706dc52msh096187744f22f0dp1d3ad8jsn0dbee325ec94",
		"x-rapidapi-host": "google-translate1.p.rapidapi.com"
	}
    })
    .then(response => {
    	console.log(response);
    })
    .catch(err => {
    	console.error(err);
    });
}

export {
    translateText,
    getLenguages
}
