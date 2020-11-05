import React from 'react';
import {
    Card,
    UserImg,
    LowerText,
    UpperText,
    SuperContainer,
    TextsContainer,
    ButtonContainer,
    UserImgContainer,
} from './components';
import DefaultImg from '../../../../icons/anonymous-user.svg';
import { COLORS } from '../../../../styles/colors'
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserCard = ({
    fullName,
    openSettings
}) => {

    const isAnonymous = fullName.length === 0;

    return (
        <SuperContainer>
            <Card>
                <UserImgContainer>
                    <UserImg src={DefaultImg} alt="user" />
                </UserImgContainer>
                <TextsContainer>
                    <UpperText>
                        { isAnonymous ? "No conectado" : "Sesion iniciada como"}
                    </UpperText>
                    <LowerText>
                        { isAnonymous ? "Anónimo" : fullName }
                    </LowerText>
                </TextsContainer>
                <ButtonContainer>
                    <FontAwesomeIcon 
                        icon={faCog}
                        size="2x"
                        style={{ cursor: "pointer", color: COLORS.WHITE }}
                        onClick={openSettings}
                    />
                </ButtonContainer>
            </Card>
        </SuperContainer>
    )
}

export default UserCard;
