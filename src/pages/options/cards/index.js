import React from 'react';
import { Card, CardsContainer } from './components';

class Cards extends React.Component {

    constructor(props) {
        super(props);
    }

    renderCards() {
        const { data } = this.props;
        return !!data.length && data.map((chat) => <Card chat={chat} />)
    }

    render() {
        return (
            <CardsContainer>
                { this.renderCards()}
            </CardsContainer>
        )
    }
}

export default Cards;
