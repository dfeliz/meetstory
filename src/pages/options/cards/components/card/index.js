import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTag, faFilePdf, faFileAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import {
    Upper,
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetMessages,
    MeetOptions,
    MenuItem,
    DropdownMenu,
    ItemText,
    ItemHeader,
    MeetDate
} from './components';
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';
import { COLORS } from '../../../../../styles/colors'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { formatDate } from '../../../utils/date';
import { downloadChat } from '../../../utils/download';


const GenerateMessages = (chat) => {
    return chat.slice(0, 6).map((message) => {
        return <MeetMessages>{message}</MeetMessages>
    })
}

function Item(props) {
    return (
        <MenuItem onClick={props.onClick}>
            <FontAwesomeIcon
                icon={props.leftIcon}
                size="1x"
                style={{ color: COLORS.INACTIVE}}
            />
            <ItemText>{props.children}</ItemText>
        </MenuItem>
    )
}


function Menu(props) {
    
    return (
        <DropdownMenu>
            <ItemHeader>Exportar a</ItemHeader>
            <Item 
                leftIcon={faGoogleDrive}
                onClick={() => {}}
                >
                Google Drive
            </Item>
            <Item 
                leftIcon={faFileAlt}
                onClick={() => downloadChat(props.chatData, 'txt')}
                >
                Archivo TXT
            </Item>
            <Item 
                leftIcon={faFilePdf}
                onClick={() => downloadChat(props.chatData, 'pdf')}
                >
                Archivo PDF
            </Item>
            <ItemHeader>Exportar en idioma</ItemHeader>
            <Item 
                leftIcon={faLanguage}
                onClick={() => {}}
                >
                Ingles (pred.)
            </Item>
        </DropdownMenu>
    );
}

function Card({
    chat,
    toggleDelete,
    toggleFavorite,
    dropdownState,
    dropdownChange
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
    const formattedDate = formatDate(date);


    return (
        <CardContainer>
            <Upper>
                <MeetLogo src={MeetIcon} alt="Meet" />
                <MeetOptions aria-controls="export-menu" src={Dots} alt="options" onClick={() => dropdownChange()} />
                {
                    dropdownState && (
                        <Menu chatData={chatValue}/>
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
