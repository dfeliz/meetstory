import React from 'react';
import { Card, CardsContainer, NothingHereMessage } from './components';

const CardsComponent = ({
    data,
    toggleDelete,
    openChatModal,
    toggleFavorite,
}) => {
    const renderCardList = (data) => {
        return data.map((chat) => (
            <Card
                chat={chat}
                key={chat.id}
                toggleDelete={toggleDelete}
                openChatModal={openChatModal}
                toggleFavorite={toggleFavorite}
            />
        ));
    }

    if (data && data.length > 0) {
        return (
            <CardsContainer>
                {renderCardList(data)}
            </CardsContainer>
        )
    }
    return <NothingHereMessage>No hay chats.</NothingHereMessage>
}

export default CardsComponent;
