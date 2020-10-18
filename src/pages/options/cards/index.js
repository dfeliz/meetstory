import React from 'react';
import {
    Card,
    CardsContainer,
} from './components';

const chats = {
    "63a38d65-19bc-4aaf-8a03-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "63a38d45-19bc-4aaf-8a03-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "13a38d65-19bc-4aaf-8a03-22690cd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "63a38ds5-19bc-4aaf-8a03-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "63138d45-19bc-4aaf-8a03-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "13a38d65-19bc-4aaf-8ad3-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "63a38465-19bc-4aaf-8a03-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "63a38d45-19bc-4aaf-8a03-12690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    "13a38d65-19bc-3aaf-8a03-22690fd28a31": {
        "title": "XD Meeting",
        "code": "kqm-nftu-unt",
        "date": "Wed Sep 30 2020 21:05:11 GMT-0400 (hora de Bolivia)",
        "messages": [
            "[21:14] Bernie Nicasio: Jajaj",
            "[21:14] You: Lol",
            "[21:14] Bernie Nicasio: XD",
            "[21:14] You: e_e",
            "[21:14] Dahiana Astacio: Andaaaa"
        ],
        "favorite": false,
        "deleted": false
    },
    
}

class Cards extends React.Component {
    renderCards() {
        // get chats from chrome storage
        const array = [];
        for (let chat in chats) {
            array.push({ [chat]: chats[chat] });
        }
        return array.map((chat) => {
            return <Card chat={chat} />
        })
    }

    render() {
        return (
            <CardsContainer>
                {this.renderCards()}
            </CardsContainer>
        )
    }
}

export default Cards;
