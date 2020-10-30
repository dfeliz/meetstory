import React from 'react';
import { Card, CardsContainer, NothingHereMessage } from './components';


class CardsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleDelete = (id) => {
        console.log('Toggling delete for ', id)
    }

    toggleFavorite = (id) => {
        console.log('Toggling fav for ', id)
    }

    renderCardList = (data) => data.map((chat) => (
        <Card
            chat={chat}
            toggleDelete={this.toggleDelete}
            toggleFavorite={this.toggleFavorite}
        />
    ));

    render() {
        const { data } = this.props;
        if (data && data.length > 0) {
            return (
                <CardsContainer>
                    {this.renderCardList(data)}
                </CardsContainer>
            )
        }
        return <NothingHereMessage>Nada por aquí...</NothingHereMessage>
    }
}

export default CardsComponent;
