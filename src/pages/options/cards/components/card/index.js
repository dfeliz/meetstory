import React from 'react';
import {
    MeetLogo,
    CardContainer,
} from './components';
import MeetIcon from '../../assets/meet.svg';

const Card = () => {

    return (
        <CardContainer>
            <MeetLogo src={MeetIcon} alt="Meet" />
        </CardContainer>
    )
}

export default Card;
