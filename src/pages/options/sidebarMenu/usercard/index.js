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
import DefaultImg from '../../cards/assets/anonymous-user.svg';
import { COLORS } from '../../../../styles/colors'
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserCard = ({ }) => {

    return (
        <SuperContainer>
            <Card>
                <UserImgContainer>
                    <UserImg src={DefaultImg} alt="user" />
                </UserImgContainer>
                <TextsContainer>
                    <UpperText>
                        Sesion iniciada como
                    </UpperText>
                    <LowerText>
                        Harold Adames
                    </LowerText>
                </TextsContainer>
                <ButtonContainer>
                    <FontAwesomeIcon 
                        icon={faCog}
                        size="2x"
                        style={{ cursor: "pointer", color: COLORS.WHITE }}
                        onClick={() => {
                            console.log('Clicked settings!')
                        }}
                    />
                </ButtonContainer>
            </Card>
        </SuperContainer>
    )
}

export default UserCard;
