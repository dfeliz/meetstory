import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen'

import {
  Page,
  PageContainer
} from './styles';
import {
  getFilteredChats,
  toggleChatFavorite,
  toggleChatDelete
} from './services';
import Cards from './components/cards';
import Sidebar from './components/sidebarMenu'
import { OptionsModal } from './components/modals';
import { nonDeleted, deleted, favorites } from './utils/filters';
import { auth, saveToken, disconnect, checkAuth } from './services';

import Logo from '../../icons/logo.svg';

class App extends Component {
  state = {
    page: 0,
    chatList: [],
    loading: true,
    isModalOpen: false,
    isAuthenticated: false,
    reloadFn: this.renderChats,
  }

  componentDidMount() {
    this.renderChats();
    this.checkIsAuthenticated();
  }

  checkIsAuthenticated = () => {
    console.log('checkIsAuthenticated')
    checkAuth().then(() => {
      this.setState({ isAuthenticated: true })
    })
  }

  handleAuthentication = () => {
    const { isAuthenticated } = this.state;
    console.log('Handling authentication...');
    return new Promise((resolve) => {
      if (!isAuthenticated) {
        auth().then((res) => {
          if (res.success) {
            console.log('Saving token...')
            saveToken(res.token)
            this.setState({ isAuthenticated: true })
          }
        }).finally((() => resolve()))
      }
      else {
        disconnect().then((res) => {
          if (res.success) {
            console.log('Disconnected');
            this.setState({ isAuthenticated: false })
          }
        }).finally((() => resolve()));
      }
    })
  }

  getFullName = () => {
    if (this.state.isAuthenticated) {
      return 'Harold Adames Montaño'
    }
    return '';
  }

  openModal = () => this.setState({ isModalOpen: true })

  closeModal = () => this.setState({ isModalOpen: false })

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
    const {
      chatList,
      page,
      loading,
      isModalOpen,
      isAuthenticated,
    } = this.state;

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
          openSettings={this.openModal}
          userFullName={this.getFullName()}
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
        <OptionsModal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          isAuthenticated={isAuthenticated}
          handleAuthentication={this.handleAuthentication}
        />
      </PageContainer>
    );
  }
}

export default App;
