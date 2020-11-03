import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen'
import {
  Page,
  PageContainer
} from './components';
import {
  getFilteredChats,
  toggleChatFavorite,
  toggleChatDelete
} from './services';
import Cards from './cards';
import Sidebar from './menu'
import Logo from '../../icons/logo.svg';
import { nonDeleted, deleted, favorites } from './utils/filters';


class App extends Component {
  state = {
    page: 0,
    chatList: [],
    loading: true,
    reloadFn: this.renderChats,
  }

  componentDidMount() {
    this.renderChats();
  }

  toggleFavorite = (id) => {
    const { reloadFn } = this.state;

    this.setState({ loading: true });
    toggleChatFavorite(id)
      .then(() => {
        this.setState({ loading: false });
        reloadFn();
      });
  }

  toggleDelete = (id) => {
    const { reloadFn } = this.state;

    this.setState({ loading: true });
    toggleChatDelete(id)
      .then(() => {
        this.setState({ loading: false });
        reloadFn();
      });
  }

  renderChats = () => {
    this.setState({
      loading: true,
      reloadFn: this.renderChats
    });

    getFilteredChats(nonDeleted).then((response) => {
      this.setState({
        chatList: response,
        page: 0,
        loading: false
      })
    });
  }

  renderFavoriteChats = () => {
    this.setState({
      loading: true,
      reloadFn: this.renderFavoriteChats
    });

    getFilteredChats(favorites).then((response) => {
      this.setState({
        chatList: response,
        page: 1,
        loading: false
      })
    });
  }

  renderDeletedChats = () => {
    this.setState({
      loading: true,
      reloadFn: this.renderDeletedChats
    });

    getFilteredChats(deleted).then((response) => {
      this.setState({
        chatList: response,
        page: 2,
        loading: false
      })
    });
  }

  render() {
    const { chatList, page, loading } = this.state;

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
          {loading
            ? (
              <LoadingScreen
                loading={true}
                spinnerColor='#51945a'
                logoSrc={Logo}
              />
            )
            : (
              <Cards
                data={chatList}
                toggleDelete={this.toggleDelete}
                toggleFavorite={this.toggleFavorite}
              />
            )
          }

        </Page>
      </PageContainer>
    );
  }
}

export default App;
