import React from 'react';
import {
    Upper,
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetMessages
} from './components';
import Tag from '../../assets/tag.svg';
import Trash from '../../assets/trash.svg';
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
        return chat.slice(0, 6).map((messages) => {
             return <MeetMessages>{messages}</MeetMessages>
        })
    }
    return (
        <CardContainer>
            <Upper>
                <MeetLogo src={MeetIcon} alt="Meet" />
                <MeetCode>{code}</MeetCode>
                <MeetTitle>{title}</MeetTitle>
                {GenerateMessages(messages)}
            </Upper>
            <MeetIcons>
                <img src={Trash} alt="delete" />
                <img src={Tag} alt="favorite" />
            </MeetIcons>
        </CardContainer>
    )
}

export default Card;
