import React, { Component } from 'react';
import Cards from './cards';
import {
  Page,
  PageContainer
} from './components';
import Sidebar  from './menu'
import { getAllChats } from './services';

class App extends Component {
  state = {
    chatList: []
  }

  componentDidMount() {
    getAllChats().then(response => {
      this.setState({
        chatList: response
      })
    })
  }
  
  render() {
    const { chatList } = this.state;
    return (
      <PageContainer>
        <Sidebar />
        <Page>
          <Cards data={chatList} />
        </Page>
      </PageContainer>
    );
  }
}

export default App;
