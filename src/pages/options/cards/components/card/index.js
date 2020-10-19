import React from 'react';
import {
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle
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

    return (
        <CardContainer>
            <MeetLogo src={MeetIcon} alt="Meet" />
            <MeetCode>{code}</MeetCode>
            <MeetTitle>{title}</MeetTitle>
        </CardContainer>
    )
}

export default Card;
