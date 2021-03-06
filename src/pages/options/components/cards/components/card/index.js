import React, { useEffect, useState, forwardRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTag, faReply } from '@fortawesome/free-solid-svg-icons';

import {
    Menu,
    Upper,
    MeetDate,
    MeetLogo,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetOptions,
    MeetMessages,
    CardContainer,
} from './components';
import constants from './constants'
import Dots from '../../assets/dots.svg';
import MeetIcon from '../../assets/meet.svg';
import { formatDate } from '../../../../utils/date';
import { COLORS } from '../../../../../../styles/colors'

const GenerateMessages = (chat) => {
    return chat.slice(Math.max(chat.length - 6, 0)).map((message) => {
        return <MeetMessages>{message}</MeetMessages>
    })
}

const Card = forwardRef(({
    chat,
    toggleDelete,
    openChatModal,
    toggleFavorite,
    openDeleteModal,
    isAuthenticated,
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
            removeToast(`deleting${id}`);
            handleDelete(id);
            addToast(constants.CHAT_UNDELETED, { appearance: 'success' })
        }

        deleted
            ? addToast(constants.CHAT_UNDELETED, { appearance: 'success' })
            : addToast(renderToastDeleteComponent(onRestoreClick), { appearance: 'error', id: `deleting${id}`})
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
                            <Menu top={45} right={0} chatData={chat} dropdownToggle={dropdownToggle} isAuthenticated={isAuthenticated} />
                        )
                    }
                    <MeetCode>{code}</MeetCode>
                    <MeetTitle>{title}</MeetTitle>
                    <MeetDate>{formattedDate}</MeetDate>
                    <div
                        style={!deleted ? { cursor: "pointer" } : undefined }
                        onClick={!deleted ? () => openChatModal({ ...chat, formattedDate, id }): undefined }
                    >
                        {GenerateMessages(messages)}
                    </div>
                </Upper>
                <MeetIcons>
                    {
                        deleted ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faReply}
                                    size="2x"
                                    style={{ cursor: "pointer", color: COLORS.INACTIVE }}
                                    onClick={() => handleDelete(id)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    size="2x"
                                    style={{ cursor: "pointer", color: COLORS.DANGER }}
                                    onClick={() => openDeleteModal(chat)}
                                />
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    size="2x"
                                    style={{ cursor: "pointer", color: COLORS.INACTIVE }}
                                    onClick={() => handleDelete(id)}
                                />
                                <FontAwesomeIcon
                                    icon={faTag}
                                    size="2x"
                                    style={{ cursor: "pointer", color: favorite ? COLORS.ACTIVE : COLORS.INACTIVE }}
                                    onClick={() => handleFavorite(id)}
                                />
                            </>
                        )
                    }
                </MeetIcons>
            </CardContainer>
        </div>
    )
})

export default Card;
