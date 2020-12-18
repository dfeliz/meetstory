import React, { useEffect, useState, forwardRef } from 'react';
import { useToasts } from 'react-toast-notifications';
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
import constants from './constants'
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';
import { COLORS } from '../../../../../../styles/colors'
import { formatDate } from '../../../../utils/date';

const GenerateMessages = (chat) => {
    return chat.slice(0, 6).map((message) => {
        return <MeetMessages>{message}</MeetMessages>
    })
}

const Card = forwardRef(({
    chat,
    toggleDelete,
    openChatModal,
    toggleFavorite,
}, ref) => {
    const {
        id,
        code,
        date,
        title,
        deleted,
        messages,
        favorite,
    } = chat;
    const { addToast, removeToast } = useToasts();
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

    const handleDelete = (id) => {
        toggleDelete(id);

        const onRestoreClick = () => {
            removeToast('deleting');
            handleDelete(id);
            addToast(constants.CHAT_UNDELETED, { appearance: 'success' })
        }

        deleted
            ? addToast(constants.CHAT_UNDELETED, { appearance: 'success' })
            : addToast(renderToastDeleteComponent(onRestoreClick), { appearance: 'error', id: 'deleting'})
    }

    const handleFavorite = (id) => {
        toggleFavorite(id);
        addToast(favorite ? constants.CHAT_UNFAVORITED : constants.CHAT_FAVORITED, { appearance: 'success' })
    }


    const dropdownToggle = () => {
        setDropdownVisible(!dropdownVisible)
    }

    const renderToastDeleteComponent = (callback) => (
        <div>
            {constants.CHAT_DELETED}
            {' '}
            <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={callback}>
                Deshacer
            </div>
        </div>
    )

    return (
        <div ref={ref}>
            <CardContainer>
                <Upper>
                    <MeetLogo src={MeetIcon} alt="Meet" />
                    <MeetOptions aria-controls="export-menu" src={Dots} alt="options" onClick={dropdownToggle} />
                    {
                        dropdownVisible && (
                            <Menu top={45} right={0} chatData={chat} dropdownToggle={dropdownToggle} />
                        )
                    }
                    <MeetCode>{code}</MeetCode>
                    <MeetTitle>{title}</MeetTitle>
                    <MeetDate>{formattedDate}</MeetDate>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => openChatModal({ ...chat, formattedDate, id })}
                    >
                        {GenerateMessages(messages)}
                    </div>
                </Upper>
                <MeetIcons>
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="2x"
                        style={{ cursor: "pointer", color: deleted ? COLORS.DANGER : COLORS.INACTIVE }}
                        onClick={() => handleDelete(id)}

                    />
                    {
                        !deleted && (
                            <FontAwesomeIcon
                                icon={faTag}
                                size="2x"
                                style={{ cursor: "pointer", color: favorite ? COLORS.ACTIVE : COLORS.INACTIVE }}
                                onClick={() => handleFavorite(id)}
                            />
                        )
                    }
                </MeetIcons>
            </CardContainer>
        </div>
    )
})

export default Card;
