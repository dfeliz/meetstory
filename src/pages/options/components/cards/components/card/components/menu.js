import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { useToasts } from 'react-toast-notifications';

import { COLORS } from '../../../../../../../styles/colors';
import { downloadChat } from '../../../../../utils/download';
import { fetchToken, uploadFile } from '../../../../../utils/drive';
import { translateText } from '../../../../../services/translator';
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
    const { dropdownToggle, top, right, isAuthenticated } = props;

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
        <DropdownMenu id="dropdown-menu" top={top} right={right}>
            <ItemHeader>Exportar a</ItemHeader>
            { isAuthenticated && (
                <Item
                    leftIcon={faGoogleDrive}
                    onClick={() => onClick(() => handdleDrive(props.chatData))}
                >
                    Google Drive
                </Item>
            )}
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
            <ItemHeader>Exportar traducido del</ItemHeader>
            <Item
                leftIcon={faLanguage}
                onClick={() => onClick(() => handdleTranslation(props.chatData, "en", "es"))}
            >
                Inglés
            </Item>
        </DropdownMenu>
    );
}

export {
    Menu,
};
