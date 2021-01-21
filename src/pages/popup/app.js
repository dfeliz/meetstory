import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Switch from 'react-switch';
import logo from '../../icons/logo.svg'
import './popup.css';
import { getAutoSave, toggleAutoSave } from './services'

import {
  TopContainer,
  MiddleContainer,
  BottomContainer,
  Title,
  Text,
  Background,
  LogoContainer
} from './components';

class App extends Component {
  state = {
    checked: false,
  }

  componentDidMount() {
    this.obtainSavedState();
  }

  obtainSavedState = () => {
    getAutoSave().then((checkStatus) => {
      this.setState({ checked: checkStatus });
    });
  }

  handleChange = () => {
    const { checked } = this.state;
    toggleAutoSave(checked)
    this.obtainSavedState();
  }

  handleOptions = () => {
    chrome.tabs.create({'url': "/pages/options.html" })
  }
  
  render() {
    const { toggleSave, isSaving } = this.props;
    const { checked }  = this.state;

    const startSavingText = 'Empezar a guardar';
    const stopSavingText = 'Parar de guardar';

    return (
      <div style={Background}>
        <div style={LogoContainer}>
          <img src={logo}></img>
        </div>
          <h1 style={Title}>Meetstory for Google Meet</h1>
        <div style={TopContainer}>
          <button id="primaryButton" className={`${ isSaving && 'danger'} button`} onClick={toggleSave}>
            {
              isSaving ? stopSavingText : startSavingText
            }
          </button>
        </div>
        <div style={MiddleContainer}>
          <Switch className="react-switch" onChange={this.handleChange} checked={checked}></Switch>
          <h1 style={Text}>Guardar chats automaticamente</h1>
        </div>
        <div style={BottomContainer}>
          <button id="secondaryButton" className="button" onClick={this.handleOptions}>Mis Meetstories</button>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(App);
