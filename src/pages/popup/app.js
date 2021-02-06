import React, { Component } from 'react';
import { connect } from 'react-redux';

import './popup.css';
import Switch from 'react-switch';
import * as actions from './actions';
import logo from '../../icons/logo.svg';
import { isGoogleMeetURL } from './helpers';
import { getAutoSave, toggleAutoSave } from './services';

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
    isOnGoogleMeet: false,
    isAutoSaveEnabled: false,
  }

  componentDidMount() {
    this.obtainSavedState();
    this.checkLocation();
  }

  checkLocation = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (res) => {
      const currentUrl = res[0].url;
      if (isGoogleMeetURL(currentUrl)) {
        this.setState({ isOnGoogleMeet: true });
      }
    })
  }

  obtainSavedState = () => {
    const { isSaving, toggleSave } = this.props;
    getAutoSave().then((checkStatus) => {
      const buttonOffToggleOn = !isSaving && checkStatus
      const buttonOnToggleOff = isSaving && !checkStatus
      if (buttonOffToggleOn || buttonOnToggleOff) {
        // Syncs button with toggle
        toggleSave();
      }

      this.setState({ isAutoSaveEnabled: checkStatus });
    });
  }

  handleChange = () => {
    const { isAutoSaveEnabled } = this.state;
    toggleAutoSave(isAutoSaveEnabled)
    this.obtainSavedState();
  }

  handleOptions = () => {
    chrome.tabs.create({'url': "/pages/options.html" })
  }
  
  render() {
    const { toggleSave, isSaving } = this.props;
    const { isAutoSaveEnabled, isOnGoogleMeet }  = this.state;

    const startSavingText = 'Empezar a guardar';
    const stopSavingText = 'Parar de guardar';

    const saveShouldBeDisabled = !isOnGoogleMeet || isAutoSaveEnabled;

    return (
      <div style={Background}>
        <div style={LogoContainer}>
          <img src={logo}></img>
        </div>
          <h1 style={Title}>Meetstory for Google Meet</h1>
        <div style={TopContainer}>
          <button
            id="primaryButton"
            className={`${ isSaving && 'danger'} ${saveShouldBeDisabled && 'disabled'} button`}
            onClick={toggleSave}
            disabled={saveShouldBeDisabled}
          >
            {
              isSaving ? stopSavingText : startSavingText
            }
          </button>
        </div>
        <div style={MiddleContainer}>
          <Switch className="react-switch" onChange={this.handleChange} checked={isAutoSaveEnabled}></Switch>
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
