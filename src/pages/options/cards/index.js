import React from 'react';
import {Card, CardsContainer} from './components';

class Cards extends React.Component {
    renderCards() {
        const {data} = this.props;
        const array = Object.entries(data).map(([key, value]) => {
            return {[key]: value}
        });

        return array.map((chat) => <Card chat={Object.values(chat)[0]} />)
    }

    render() {
        return (
            <CardsContainer> {
                this.renderCards()
            } </CardsContainer>
        )
    }
}

export default Cards;
