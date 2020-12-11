import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../../../../styles/colors'
import Dots from '../../cards/assets/dots.svg';

import {
    Code,
    Date,
    Title,
    Header,
    Options,
    MeetOptions,
    ChatContainer,
    RightContainer,
} from './components';
import constants from './constants'
import {
    Menu,
} from '../../cards/components/card/components';
import ModalBase from '../modalBase';

const printMessages = (messages) => messages.map((message) => <div>{message}</div>)

const ChatModal = ({
    isOpen,
    selectedChat,
    toggleDelete,
    toggleFavorite,
    onRequestClose,
}) => {
    const { addToast, removeToast } = useToasts();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const {
        id,
        code,
        title,
        messages,
        deleted,
        favorite,
        formattedDate,
    } = selectedChat;

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
        <ModalBase
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                width: 969,
                padding: 60,
                paddingTop: 46,
            }}
        >
            <Header>
                <div>
                    <Code>
                        {code}
                    </Code>
                    <Title>
                        {title}
                    </Title>
                    <Date>
                        {formattedDate}
                    </Date>
                </div>
                <RightContainer>
                    <Options>
                        <FontAwesomeIcon
                            icon={faTag}
                            size="2x"
                            style={{ cursor: "pointer", color: favorite ? COLORS.ACTIVE : COLORS.INACTIVE }}
                            onClick={() => handleFavorite(id)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="2x"
                            style={{ cursor: "pointer", color: deleted ? COLORS.DANGER : COLORS.INACTIVE }}
                            onClick={() => {
                                onRequestClose();
                                handleDelete(id);
                            }}
                        />
                        <MeetOptions aria-controls="export-menu" src={Dots} alt="options" onClick={dropdownToggle} />
                        {
                            dropdownVisible && (
                                <Menu top={0} right={-20} chatData={selectedChat} dropdownToggle={dropdownToggle} />
                            )
                        }
                    </Options>
                </RightContainer>
            </Header>
            <ChatContainer>
                {printMessages(messages)}
            </ChatContainer>
        </ModalBase>
    )
}

export default ChatModal;
