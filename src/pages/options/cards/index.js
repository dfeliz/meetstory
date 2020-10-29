import React from 'react';
import { Card, CardsContainer, NothingHereMessage } from './components';

const renderCardList = (data) => data.map((chat) => <Card chat={chat} />)

function CardsComponent({ data }) {
    if (data && data.length > 0) {
        return (
            <CardsContainer>
                {renderCardList(data)}
            </CardsContainer>
        )
    }
    return <NothingHereMessage>Nada por aquí...</NothingHereMessage>
}

export default CardsComponent;
