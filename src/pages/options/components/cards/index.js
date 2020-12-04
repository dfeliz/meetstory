import React from 'react';
import { useToasts } from 'react-toast-notifications'
import { Card, CardsContainer, NothingHereMessage } from './components';

const CardsComponent = ({
    data,
    toggleDelete,
    openChatModal,
    toggleFavorite,
}) => {
    const { addToast } = useToasts();

    const handleDelete = (id) => {
        toggleDelete(id);
        addToast('Meetstory borrado.', { appearance: 'success' })
    }

    const handleFavorite = (id) => {
        toggleFavorite(id);
        addToast('Meetstory marcado como favorito.', { appearance: 'success' })
    }

    const renderCardList = (data) => {
        return data.map((chat) => (
            <Card
                chat={chat}
                key={chat.id}
                toggleDelete={handleDelete}
                openChatModal={openChatModal}
                toggleFavorite={handleFavorite}
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
