import React from 'react';
import {
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetChat,
    MeetIcons,
    MeetMessages
} from './components';
import MeetIcon from '../../assets/meet.svg';

const Card = ({ chat }) => {
    const {
        title,
        code,
        date,
        messages,
        favorite,
        deleted,
    } = chat;

    function GenerateMessages(chat) {
        return chat.slice(0, 5).map((messages) => {
             return <MeetMessages>{messages}</MeetMessages>
        })
    }
    return (
        <CardContainer>
            <MeetLogo src={MeetIcon} alt="Meet" />
            <MeetCode>{code}</MeetCode>
            <MeetTitle>{title}</MeetTitle>
            <MeetChat>
                {GenerateMessages(messages)}
            </MeetChat>
            <MeetIcons>
                Basura
                asdasd
            </MeetIcons>
        </CardContainer>
    )
}

export default Card;
