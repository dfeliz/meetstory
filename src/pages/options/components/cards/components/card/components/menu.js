import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { useToasts } from 'react-toast-notifications';

import { COLORS } from '../../../../../../../styles/colors';
import { downloadChat } from '../../../../../utils/download';
import { fetchToken, uploadFile } from '../../../../../utils/drive';
import { translateText } from '../../../../../utils/translator';
import {
    MenuItem,
    ItemText,
    ItemHeader,
    DropdownMenu,
    IconContainer,
} from '.';

const Item = (props) => (
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


const Menu = (props) => {
    const { addToast, removeToast } = useToasts();
    const { dropdownToggle } = props;

    const onClick = (fn) => {
        fn();
        dropdownToggle();
    }

    const handdleDrive = async (chatData) => {
        const token = await fetchToken();
        addToast(`Subiendo meetstory...`, { appearance: "info", id: "uploading", autoDismiss: false });
        try {
            const fileName = await uploadFile(chatData, token);
            setTimeout(() => {
                removeToast("uploading");
                addToast(`Archivo "${fileName}" subido exitosamente.`, { appearance: "success" });
            }, 1500)
        } catch(err) {
            removeToast("uploading");
            addToast(`No se pudo subir el meetstory. Error: ${err}`, { appearance: "error" });
        }
    }

    const handdleTranslation = async (chatData, sourceLenguage, targetLenguage) => {
        addToast(`El meetstory traducido se descargara en breve...`, { appearance: "info", id: "translating", autoDismiss: false });
        try {
            translateText(chatData, sourceLenguage, targetLenguage);
            setTimeout(() => {
                removeToast("translating");
                addToast(`Traduccion completeda.`, { appearance: "success" });
            }, 1500)
        } catch(err) {
            removeToast("translating");
            addToast(`No se pudo traducir el meetstory. Error: ${err}`, { appearance: "error" });
        }
    }

    return (
        <DropdownMenu id="dropdown-menu">
            <ItemHeader>Exportar a</ItemHeader>
            <Item
                leftIcon={faGoogleDrive}
                onClick={() => onClick(() => handdleDrive(props.chatData))}
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
                onClick={() => onClick(() => handdleTranslation(props.chatData, "es", "en"))}
            >
                Ingles (pred.)
            </Item>
        </DropdownMenu>
    );
}

export {
    Menu,
};
