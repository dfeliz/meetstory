import React from 'react';
import GButton from '../../../../../icons/gbutton.svg';
import {
    Icon,
    Text,
    ButtonContainer,
} from './components';

const GoogleButton = (props) => {
    const { isConnected } = props;
    return (
        <ButtonContainer {...props}>
            <Icon src={GButton} alt="google connect" />
            <Text>{
                isConnected
                    ? "Desconectar"
                    : "Conectar con Google"
            }</Text>
        </ButtonContainer>
    )
}

export default GoogleButton;
