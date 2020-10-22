import React, { Component } from 'react';
import Cards from './cards';
import {
  Page,
  PageContainer
} from './components';
import Sidebar  from './menu'
import { getAllChats } from './services';

class App extends Component {

  async getChats() {
    const data = await getAllChats();
    console.log(data);
    return data;
  }

  render() {
    return (
      <PageContainer>
        <Sidebar />
        <Page>
          <Cards data={this.getChats()} />
        </Page>
      </PageContainer>
    );
  }
}

export default App;
