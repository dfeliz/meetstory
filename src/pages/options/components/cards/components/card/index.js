import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTag } from '@fortawesome/free-solid-svg-icons';

import {
    Menu,
    Upper,
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetMessages,
    MeetOptions,
    MeetDate
} from './components';
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';
import { COLORS } from '../../../../../../styles/colors'
import { formatDate } from '../../../../utils/date';

const GenerateMessages = (chat) => {
    return chat.slice(0, 6).map((message) => {
        return <MeetMessages>{message}</MeetMessages>
    })
}

const Card = ({
    chat,
    toggleDelete,
    toggleFavorite,
}) => {
    const chatValue = Object.values(chat)[0];
    const chatId = Object.keys(chat)[0];
    const {
        title,
        code,
        date,
        messages,
        favorite,
        deleted,
    } = chatValue;
    const formattedDate = formatDate(date);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            const dropdown = document.getElementById("dropdown-menu");
            const clickedElement = e.target;
    
            if (dropdownVisible) {
                if (!dropdown.contains(clickedElement)) {
                    setDropdownVisible(false);
                }
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return function cleanup() {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    })

    const dropdownToggle = () => {
        setDropdownVisible(!dropdownVisible)
    }

    return (
        <CardContainer>
            <Upper>
                <MeetLogo src={MeetIcon} alt="Meet" />
                <MeetOptions aria-controls="export-menu" src={Dots} alt="options" onClick={dropdownToggle} />
                {
                    dropdownVisible && (
                        <Menu chatData={chatValue} dropdownToggle={dropdownToggle} />
                    )
                }
                <MeetCode>{code}</MeetCode>
                <MeetTitle>{title}</MeetTitle>
                <MeetDate>{formattedDate}</MeetDate>
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
