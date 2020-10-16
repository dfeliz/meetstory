import React, { Component } from 'react';
import {
  SideBarMenu,
  PageContainer
} from './components';

class App extends Component {

  render() {
    return (
      <PageContainer>
        <SideBarMenu>
          Hola xD
        </SideBarMenu>
      </PageContainer>
    );
  }
}

export default App;
