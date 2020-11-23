import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

import { COLORS } from '../../../../../../styles/colors'
import { downloadChat } from '../../../../utils/download';
import { fetchToken, uploadFile } from '../../../../utils/drive'
import {
    MenuItem,
    ItemText,
    ItemHeader,
    DropdownMenu,
    IconContainer,
} from './';

const handdleDrive = async (chatData, fileType) => {
    const token = await fetchToken();
    uploadFile(chatData, fileType, token)
}

const Item = (props) => {
    return (
        <MenuItem onClick={props.onClick}>
            <IconContainer>
                <FontAwesomeIcon
                    icon={props.leftIcon}
                    size="1x"
                    style={{ color: COLORS.INACTIVE }}
                />
            </IconContainer>
            <ItemText>{props.children}</ItemText>
        </MenuItem>
    )
}

const Menu = (props) => (
    <DropdownMenu>
        <ItemHeader>Exportar a</ItemHeader>
        <Item
            leftIcon={faGoogleDrive}
            onClick={() => handdleDrive(props.chatData, "text/plain")}
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

export {
    Menu,
};
