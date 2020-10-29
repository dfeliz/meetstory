import React, { Component } from 'react';
import Cards from './cards';
import {
  Page,
  PageContainer
} from './components';
import Sidebar  from './menu'
import { getFilteredChats } from './services';
import { nonDeleted, deleted, favorites } from './utils/filters';

class App extends Component {
  state = {
    page: 0,
    chatList: [],
  }

  componentDidMount() {
    this.renderChats();
  }

  renderChats() {
    getFilteredChats(nonDeleted).then((response) => {
      this.setState({
        chatList: response,
        page: 0,
      })
    });
  }

  renderFavoriteChats() {
    getFilteredChats(favorites).then((response) => {      
      this.setState({
        chatList: response,
        page: 1,
      })
    });
  }

  renderDeletedChats() {
    getFilteredChats(deleted).then((response) => {
      this.setState({
        chatList: response,
        page: 2,
      })
    });
  }

  render() {
    const { chatList, page } = this.state;

    const sidebarHandlers = [
      this.renderChats,
      this.renderFavoriteChats,
      this.renderDeletedChats,
    ]

    return (
      <PageContainer>
        <Sidebar
          page={page}
          handlers={sidebarHandlers}
        />
        <Page>
          <Cards data={chatList} />
        </Page>
      </PageContainer>
    );
  }
}

export default App;
