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
import Sidebar from './sidebarMenu'
import { OptionsModal, ChatModal } from './modals';
import { nonDeleted, deleted, favorites } from './utils/filters';

import Logo from '../../icons/logo.svg';

class App extends Component {
  state = {
    page: 0,
    chatList: [],
    loading: true,
    isOptionsModalOpen: false,
    isChatModalOpen: false,
    reloadFn: this.renderChats,
    selectedChat: {
      messages: [],
    },
  }

  componentDidMount() {
    this.renderChats();
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
      page,
      loading,
      chatList,
      selectedChat,
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
          openSettings={this.openOptionsModal}
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
                openChatModal={this.openChatModal}
                toggleDelete={this.toggleDelete}
                toggleFavorite={this.toggleFavorite}
              />
            )
          }

        </Page>
        <ChatModal isOpen={isChatModalOpen} onRequestClose={this.closeChatModal} selectedChat={selectedChat} />
        <OptionsModal isOpen={isOptionsModalOpen} onRequestClose={this.closeOptionsModal} />
      </PageContainer>
    );
  }
}

export default App;
