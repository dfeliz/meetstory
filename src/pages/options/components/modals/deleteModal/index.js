import React, { useState, useEffect, useReducer } from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from '../../../../../styles/colors'

import {
    Code,
    Title,
    Divider,
    Subtitle,
    ButtonDelete,
    ButtonCancel,
    ModalContainer,
    ButtonContainer,
} from './components';

import ModalBase from '../modalBase';

async function confirmDelete(id, onRequestClose, deleteChat) {
    await deleteChat(id);
    onRequestClose();
}


const DeleteModal = ({
    isOpen,
    deleteChat,
    selectedChat,
    onRequestClose,
}) => {
    const {
        id,
        code,
        title,
    } = selectedChat;
    return (
        <ModalBase
            isOpen={isOpen}
            style={{
                width: 500,
                padding: 25,
            }}
            hideCloseButton={true}
        >
            <ModalContainer>
                <FontAwesomeIcon
                    size="6x"
                    icon={faTrashAlt}
                    style={{ color: COLORS.DANGER }}
                />
                <Title>
                    ¿Esta seguro que quiere borrar el meetstory?
                </Title>
                <Code>
                    Titulo: {title}
                </Code>
                <Code>
                    Codigo: {code}
                </Code>
                <ButtonContainer>
                    <ButtonDelete onClick={() => confirmDelete(id, onRequestClose, deleteChat)}>
                        Borrar
                    </ButtonDelete>
                    <Divider/>
                    <ButtonCancel onClick={onRequestClose}>
                        Cancelar
                    </ButtonCancel>
                </ButtonContainer>
            </ModalContainer>
        </ModalBase>
    )
}

export default DeleteModal;
