import React, { Component } from 'react';
import {
  Title,
  Option,
  Shadow,
  Container,
  SuperContainer,
} from './components'
import UserCard from './usercard';

const options = [
  { title: 'Todos los meetstories' },
  { title: 'Marcados como favorito' },
  { title: 'Eliminados' }
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 378
    }
    this.renderOptions = this.renderOptions.bind(this);
    this.handleMenuMove = this.handleMenuMove.bind(this);
  }

  handleMenuMove(index) {
    // const { position } = this.state;
    // const shadowHeight = 60;
    // this.setState({ position: position - (index * shadowHeight) })
  }

  handleOpenSettings = () => {
    console.log('Opening settings...')
  }

  renderOptions() {
    const clickHandlers = this.props.handlers;
    console.log(clickHandlers);

    // this.handleMenuMove(index); // <- this goes inside option onClick
    return options.map((option, index) =>
      <Option onClick={clickHandlers[index]}>
        {option.title}
      </Option>
    )
  }

  render() {
    const { position } = this.state;
    return (
      <SuperContainer>
        <Container style={{ paddingTop: `${position}px` }}>
          <Title>Mis Meetstories</Title>
          {this.renderOptions()}
        </Container>
        {/* <Shadow /> */}
        <UserCard
          fullName="Harold Adames Montaño"
          openSettings={this.handleOpenSettings}
        />
      </SuperContainer>
    );
  }
}

export default Sidebar;
