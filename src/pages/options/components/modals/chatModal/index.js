import React, { useState, useEffect, useReducer } from 'react';
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

    const dropdownToggle = () => {
        setDropdownVisible(!dropdownVisible)
    }

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
                            onClick={() => toggleFavorite(id)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="2x"
                            style={{ cursor: "pointer", color: deleted ? COLORS.DANGER : COLORS.INACTIVE }}
                            onClick={() => {
                                onRequestClose();
                                toggleDelete(id);
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