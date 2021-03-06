import { downloadChat } from '../utils/download'
import { getTranslation } from './index'

const translateText = (chatData, sourceLenguage) => {

	const chatMessages = chatData.messages.join('\r\n');

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json; charset=utf-8");

	var requestBody = {
		"q": chatMessages,
		"source": sourceLenguage,
		"target": "es",
		"format": "text",
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
		})
		.then(response => {
			const translatedChat = {...chatData};
			translatedChat.messages = response.data.translations.map((translation) => translation.translatedText)
			downloadChat(translatedChat)
		})
		.catch(err => {
			console.error(err);
		});
}

export {
	translateText,
}
