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
    ItemHeader
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

const downloadTxtFile = (chatMessages, meetCode, title, date) => {
    const messages = createArray(chatMessages, meetCode, title, date)
    const element = document.createElement("a");
    const file = new Blob([messages],{type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = title + "-" + meetCode+".pdf";
    document.body.appendChild(element);
    element.click();
  }

const createArray = (chatMessages, meetCode, title, date) => {
    const messagesArray = chatMessages
    const titleArray = [title, meetCode, date]
    const concatArray = titleArray.concat(messagesArray)
    const completeArray = concatArray.reduce((r, a) => r.concat(a, "\r\n"), [0]);
    return completeArray
}

const toggleDropdown = () => {
    // toggle the state
}

function Menu(props) {

    function Item(props) {
        return (
            <MenuItem onClick={() => downloadTxtFile(props.Messages, props.Code, props.Title, props.Date)}>
                <FontAwesomeIcon 
                    icon={props.leftIcon}
                    size="1x"
                    style={{ color: COLORS.INACTIVE}}
                />
                <ItemText>{props.children}</ItemText>                
            </MenuItem>
        )
    }

    return (
        <DropdownMenu>
            <ItemHeader>Exportar a</ItemHeader>
            <Item 
                Messages={props.Messages} 
                Code={props.Code} 
                Title={props.Title} 
                Date={props.Date} 
                leftIcon={faGoogleDrive}
                >
                Google Drive
            </Item>
            <Item 
                Messages={props.Messages} 
                Code={props.Code} 
                Title={props.Title} 
                Date={props.Date} 
                leftIcon={faFileAlt}
                >
                Archivo TXT
            </Item>
            <Item 
                Messages={props.Messages}
                Code={props.Code} 
                Title={props.Title} 
                Date={props.Date} 
                leftIcon={faFilePdf}
                >
                Archivo PDF
            </Item>
            <ItemHeader>Exportar en idioma</ItemHeader>
            <Item 
                Messages={props.Messages} 
                Code={props.Code} 
                Title={props.Title} 
                Date={props.Date} 
                leftIcon={faLanguage}
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

    return (
        <CardContainer>
            <Upper>
                <MeetLogo src={MeetIcon} alt="Meet" />
                <MeetOptions aria-controls="export-menu" src={Dots} alt="options" onClick={() => dropdownChange()} />
                {
                    dropdownState && (
                        <Menu Messages={messages} Code={code} Title={title} Date={date}/>
                    )
                }
                <MeetOptions src={Dots} alt="options" onClick={() => downloadChat(chatValue, 'txt') /* TODO: Add this to menu */} /> 
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
