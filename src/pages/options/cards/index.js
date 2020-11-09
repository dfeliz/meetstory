import React from 'react';
import { Card, CardsContainer, NothingHereMessage } from './components';

class CardsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false
          };
    }

    renderCardList = (data) => {
        const { toggleDelete, toggleFavorite } = this.props;
    
    const dropdownToggle = () => {
        this.setState(prevState => ({ 
            dropdown: !prevState.dropdown 
        }));
    }

        return data.map((chat) => (
            <Card
                chat={chat}
                toggleDelete={toggleDelete}
                toggleFavorite={toggleFavorite}
                dropdownState={this.state.dropdown}
                dropdownChange={dropdownToggle}
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
