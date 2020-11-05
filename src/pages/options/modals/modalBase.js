import React from 'react';
import ReactModal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from '../../../styles/colors';

import {
    CloseButtonContainer
} from './components';

const ModalBase = (props) => {
    return (
        <ReactModal
            isOpen={props.isOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={props.onRequestClose}
            style={{
                overlay: {
                    backgroundColor: '#000000A0',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    borderRadius: 13,
                    transform: 'translate(-50%, -50%)',
                    position: 'relative',
                    ...props.style,
                }
            }}
        >
            <CloseButtonContainer>
                <FontAwesomeIcon
                    icon={faTimes}
                    size="2x"
                    style={{ cursor: "pointer", color: COLORS.INACTIVE }}
                    onClick={props.onRequestClose}
                />
            </CloseButtonContainer>
            { props.children }
        </ReactModal>
    )

}

export default ModalBase;