import React, { Component } from 'react';
import Cards from './cards';
import {
  Page,
  PageContainer
} from './components';
import Sidebar  from './menu/index'

class App extends Component {

  render() {
    return (
      <PageContainer>
        <Sidebar />
        <Page>
          <Cards />
        </Page>
      </PageContainer>
    );
  }
}

export default App;
