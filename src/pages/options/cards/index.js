import React from 'react';
import { Card, CardsContainer, NothingHereMessage } from './components';

class CardsComponent extends React.Component {

    renderCardList = (data) => {
        const { toggleDelete, toggleFavorite } = this.props;
    

        return data.map((chat) => (
            <Card
                chat={chat}
                toggleDelete={toggleDelete}
                toggleFavorite={toggleFavorite}
            />
        ));
    }

    render() {
        const { data } = this.props;
        if (data && data.length > 0) {
            return (
                <CardsContainer>
                    {this.renderCardList(data)}
                </CardsContainer>
            )
        }
        return <NothingHereMessage>No hay chats.</NothingHereMessage>
    }
}

export default CardsComponent;
