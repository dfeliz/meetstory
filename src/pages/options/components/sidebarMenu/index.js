import React, { Component } from 'react';
import {
  Title,
  Option,
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

  renderOptions() {
    const { page } = this.props;
    const clickHandlers = this.props.handlers;

    return options.map((option, index) =>
      <Option
        onClick={clickHandlers[index]}
        className={ index === page && 'sidebar-option-active'}
      >
        {option.title}
      </Option>
    )
  }

  render() {
    const { openSettings, userFullName, userPhoto } = this.props;

    return (
      <SuperContainer>
        <Container>
          <Title>Mis Meetstories</Title>
          {this.renderOptions()}
        </Container>
        <UserCard
          fullName={userFullName}
          openSettings={openSettings}
          userPhoto={userPhoto}
        />
      </SuperContainer>
    );
  }
}

export default Sidebar;
