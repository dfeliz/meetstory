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
import { OptionsModal, ChatModal } from './components/modals';
import { nonDeleted, deleted, favorites } from './utils/filters';
import { auth, saveToken, disconnect, checkAuth } from './services';
import { chatInitialState } from './utils/state';

import Logo from '../../icons/logo.svg';

class App extends Component {
  state = {
    page: 0,
    chatList: [],
    loading: true,
    isChatModalOpen: false,
    isAuthenticated: false,
    isOptionsModalOpen: false,
    reloadFn: this.renderChats,
    selectedChat: chatInitialState,
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
            console.log('Saving token...', res.token)
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

  openOptionsModal = () => this.setState({ isOptionsModalOpen: true });

  closeOptionsModal = () => this.setState({ isOptionsModalOpen: false });

  openChatModal = (chat) => this.setState({ isChatModalOpen: true, selectedChat: chat });

  closeChatModal = () => this.setState({ isChatModalOpen: false });

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
      this.updateChatList({ page: 0, chatList: response})
    });
  }

  renderFavoriteChats = () => {
    this.setState({
      loading: true,
      reloadFn: this.renderFavoriteChats
    });

    getFilteredChats(favorites).then((response) => {
      this.updateChatList({ page: 1, chatList: response})
    });
  }

  renderDeletedChats = () => {
    this.setState({
      loading: true,
      reloadFn: this.renderDeletedChats
    });

    getFilteredChats(deleted).then((response) => {
      this.updateChatList({ page: 2, chatList: response})
    });
  }

  updateChatList = ({ chatList, page,}) => {
    const { selectedChat } = this.state;

    let updatedSelectedChat = selectedChat.id
      ? chatList.find((chat) => chat?.id === selectedChat.id)
      : chatInitialState;
    
    if (updatedSelectedChat === undefined) {
      updatedSelectedChat = chatInitialState;
    }

    this.setState({
      page,
      chatList,
      loading: false,
      selectedChat: updatedSelectedChat,
    })
  }

  render() {
    const {
      page,
      loading,
      chatList,
      selectedChat,
      isAuthenticated,
      isChatModalOpen,
      isOptionsModalOpen,
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
          userFullName={this.getFullName()}
          openSettings={this.openOptionsModal}
        />
        <Page>
          {loading
            ? (
              <LoadingScreen
                loading={true}
                logoSrc={Logo}
                spinnerColor='#51945a'
              />
            )
            : (
              <Cards
                data={chatList}
                toggleDelete={this.toggleDelete}
                openChatModal={this.openChatModal}
                toggleFavorite={this.toggleFavorite}
              />
            )
          }
        </Page>
        <OptionsModal
          isOpen={isOptionsModalOpen}
          isAuthenticated={isAuthenticated}
          onRequestClose={this.closeOptionsModal}
          handleAuthentication={this.handleAuthentication}
        />
        <ChatModal
          isOpen={isChatModalOpen}
          selectedChat={selectedChat}
          toggleDelete={this.toggleDelete}
          onRequestClose={this.closeChatModal}
          toggleFavorite={this.toggleFavorite}
        />
      </PageContainer>
    );
  }
}

export default App;
