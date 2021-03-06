import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen'

import {
  Page,
  PageContainer
} from './styles';
import {
  getFilteredChats,
  toggleChatFavorite,
  toggleChatDelete,
} from './services';
import Cards from './components/cards';
import Sidebar from './components/sidebarMenu'
import { OptionsModal, ChatModal, DeleteModal } from './components/modals';
import { nonDeleted, deleted, favorites } from './utils/filters';
import { auth, disconnect, checkAuth, deleteChat, obtainName } from './services';
import { chatInitialState } from './utils/state';
import Logo from '../../icons/logo.svg';
import { getName, getPhoto } from './services/accountInfo';

class App extends Component {
  state = {
    page: 0,
    chatList: [],
    loading: true,
    isChatModalOpen: false,
    isAuthenticated: false,
    isOptionsModalOpen: false,
    isDeleteModalOpen: false,
    reloadFn: this.renderChats,
    selectedChat: chatInitialState,
    userFullName: "",
    userPhoto: "",
  }

  componentDidMount() {
    this.renderChats();
    this.checkIsAuthenticated();
  }

  checkIsAuthenticated = () => {
    checkAuth().then((response) => {
      this.setState({ isAuthenticated: true })
      this.obtainUserInfo(response);
    })
  }

  handleAuthentication = () => {
    const { isAuthenticated } = this.state;
    return new Promise((resolve) => {
      if (!isAuthenticated) {
        auth().then((res) => {
          if (res.success) {
            this.setState({ isAuthenticated: true})
            this.obtainUserInfo(res.token);
          }
        }).finally((() => resolve()))
      }
      else {
        disconnect().then((res) => {
          if (res.success) {
            this.setState({ isAuthenticated: false, userFullName: "" })
          }
        }).finally((() => resolve()));
      }
    })
  }

  obtainUserInfo = (token) => {
    getName(token).then((UserName) => {
      this.setState({ userFullName: UserName})
    })
    getPhoto(token).then((photo) => {
      this.setState({ userPhoto: photo})
    })
  }
  openOptionsModal = () => this.setState({ isOptionsModalOpen: true });

  closeOptionsModal = () => this.setState({ isOptionsModalOpen: false });

  openChatModal = (chat) => this.setState({ isChatModalOpen: true, selectedChat: chat });

  closeChatModal = () => this.setState({ isChatModalOpen: false });

  closeDeleteModal = () => this.setState({ isDeleteModalOpen: false });

  openDeleteModal = (chat) => this.setState({ isDeleteModalOpen: true, selectedChat: chat });

  toggleFavorite = (id) => {
    const { reloadFn } = this.state;

    toggleChatFavorite(id)
      .then(() => {
        reloadFn();
      });
  }

  toggleDelete = (id) => {
    const { reloadFn } = this.state;

    toggleChatDelete(id)
      .then(() => {
        reloadFn();
      });
  }

  deleteSelectedChat = (id) => {
    const { reloadFn } = this.state;

    this.setState({ loading: true });
    deleteChat(id)
      .then(() => {
        this.setState({ loading: false });
        reloadFn();
      });
  }

  renderChats = () => {
    this.setState({
      reloadFn: this.renderChats
    });

    getFilteredChats(nonDeleted).then((response) => {
      this.updateChatList({ page: 0, chatList: response})
    });
  }

  renderFavoriteChats = () => {
    this.setState({
      reloadFn: this.renderFavoriteChats
    });

    getFilteredChats(favorites).then((response) => {
      this.updateChatList({ page: 1, chatList: response})
    });
  }

  renderDeletedChats = () => {
    this.setState({
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
      isDeleteModalOpen,
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
          userFullName={this.state.userFullName}
          openSettings={this.openOptionsModal}
          userPhoto={this.state.userPhoto}
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
                isAuthenticated={isAuthenticated}
                toggleDelete={this.toggleDelete}
                openChatModal={this.openChatModal}
                openDeleteModal={this.openDeleteModal}
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
          isAuthenticated={isAuthenticated}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          deleteChat={this.deleteSelectedChat}
          onRequestClose={this.closeDeleteModal}
          selectedChat={selectedChat}
        />
      </PageContainer>
    );
  }
}

export default App;
