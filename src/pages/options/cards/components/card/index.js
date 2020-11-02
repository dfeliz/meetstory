import React from 'react';
import {
    Upper,
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetMessages,
    MeetOptions,
} from './components';
import Tag from '../../assets/tag.svg';
import Trash from '../../assets/trash.svg';
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';

const GenerateMessages = (chat) => {
    return chat.slice(0, 6).map((message) => {
        return <MeetMessages>{message}</MeetMessages>
    })
}

function Card({
    chat,
    toggleDelete,
    toggleFavorite
}) {
    const chatValue = Object.values(chat)[0];
    const {
        title,
        code,
        date,
        messages,
        favorite,
        deleted,
    } = chatValue;
    const chatId = Object.keys(chat)[0];


    return (
        <CardContainer>
            <Upper>
                <MeetLogo src={MeetIcon} alt="Meet" />
                <MeetOptions src={Dots} alt="options" />
                <MeetCode>{code}</MeetCode>
                <MeetTitle>{title}</MeetTitle>
                <div style={{ cursor: "pointer" }}>
                    {GenerateMessages(messages)}
                </div>
            </Upper>
            <MeetIcons>
                <img
                    src={Trash}
                    alt="delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleDelete(chatId)}
                />
                <img
                    src={Tag}
                    alt="favorite"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFavorite(chatId)}
                />
            </MeetIcons>
        </CardContainer>
    )
}

export default Card;
