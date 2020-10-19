import React from 'react';
import {
    Upper,
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetMessages,
    MeetOptions
} from './components';
import Tag from '../../assets/tag.svg';
import Trash from '../../assets/trash.svg';
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';

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
                <MeetOptions src={Dots} alt="options" />
                <MeetCode>{code}</MeetCode>
                <MeetTitle>{title}</MeetTitle>
                <div style={{cursor: "pointer"}}>
                    {GenerateMessages(messages)}
                </div>                
            </Upper>
            <MeetIcons>
                <img style={{cursor: "pointer"}} src={Trash} alt="delete" />
                <img style={{cursor: "pointer"}} src={Tag} alt="favorite" />
            </MeetIcons>
        </CardContainer>
    )
}

export default Card;
