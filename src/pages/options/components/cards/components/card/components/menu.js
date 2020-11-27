import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

import { COLORS } from '../../../../../../../styles/colors'
import { downloadChat } from '../../../../../utils/download';
import {
    MenuItem,
    ItemText,
    ItemHeader,
    DropdownMenu,
    IconContainer,
} from '.';

const Item = (props) => {
    return (
        <MenuItem onClick={props.onClick} className="dropdown-item">
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

const Menu = (props) => {
    const { dropdownToggle } = props;

    const onClick = (fn) => {
        fn();
        dropdownToggle();
    }

    return (
        <DropdownMenu id="dropdown-menu">
            <ItemHeader>Exportar a</ItemHeader>
            <Item
                leftIcon={faGoogleDrive}
                onClick={() => onClick(() => {})}
            >
                Google Drive
            </Item>
            <Item
                leftIcon={faFileAlt}
                onClick={() => onClick(() => downloadChat(props.chatData, 'txt'))}
            >
                Archivo TXT
            </Item>
            <Item
                leftIcon={faFilePdf}
                onClick={() => onClick(() => downloadChat(props.chatData, 'pdf'))}
            >
                Archivo PDF
            </Item>
            <ItemHeader>Exportar en idioma</ItemHeader>
            <Item
                leftIcon={faLanguage}
                onClick={() => onClick(() => {})}
            >
                Ingles (pred.)
            </Item>
        </DropdownMenu>
    );
}

export {
    Menu,
};
