import React, { useState, useEffect, useReducer } from 'react';
import { Button } from '@material-ui/core';

import {
    Code,
    Title,
    ButtonContainer,
    ModalContainer,
} from './components';

import ModalBase from '../modalBase';

async function confirmDelete(id, onRequestClose, deleteChat) {
    await deleteChat(id);
    onRequestClose();
}

const DeleteModal = ({
    isOpen,
    onRequestClose,
    selectedChat,
    deleteChat,
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
                width: 450,
                padding: 20,
            }}
            hideCloseButton={true}
        >
            <ModalContainer>
                <Title>
                    Esta seguro que quiere borrar el meet "{title}" con codigo:
                </Title>
                <Code>
                    {code}
                </Code>
                <ButtonContainer>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => confirmDelete(id, onRequestClose, deleteChat)}
                        >Borrar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onRequestClose}
                        >Cancelar
                    </Button>
                </ButtonContainer>
            </ModalContainer>
        </ModalBase>
    )
}

export default DeleteModal;
