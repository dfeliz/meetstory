import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTag } from '@fortawesome/free-solid-svg-icons';
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
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';
import { COLORS } from '../../../../../styles/colors'


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
                <FontAwesomeIcon 
                    icon={faTrashAlt}
                    size="2x"
                    style={{ cursor: "pointer", color: deleted ? COLORS.DANGER : COLORS.INACTIVE }}
                    onClick={() => toggleDelete(chatId)}
                
                />
                {
                    !deleted && (
                        <FontAwesomeIcon 
                            icon={faTag}
                            size="2x"
                            style={{ cursor: "pointer", color: favorite ? COLORS.ACTIVE : COLORS.INACTIVE }}
                            onClick={() => toggleFavorite(chatId)}
                        />
                    ) 
                }
            </MeetIcons>
        </CardContainer>
    )
}

export default Card;
