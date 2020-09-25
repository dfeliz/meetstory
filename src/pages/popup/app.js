import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import Switch from 'react-switch';
import logo from '../../icons/logo.svg'
import './popup.css';

import {
  TopContainer,
  MiddleContainer,
  BottomContainer,
  Title,
  Text,
  Background,
  LogoContainer
} from "./components";

class App extends Component {
  static propTypes = {
    obtainText: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({checked})
  }
  
  render() {
    const { obtainText } = this.props;

    return (
      <div style={Background}>
        <div style={LogoContainer}>
          <img src={logo}></img>
        </div>
          <h1 style={Title}>Meetstory for Google Meets</h1> 
        <div style={TopContainer}>
          <button id="primaryButton" className="button" onClick={obtainText}>Empezar a guardar</button>
        </div>
        <div style={MiddleContainer}>
          <Switch className="react-switch" onChange={this.handleChange} checked={this.state.checked}></Switch>
          <h1 style={Text}>Guardar chats automaticamente</h1>
        </div>
        <div style={BottomContainer}>
          <button id="secondaryButton" className="button">Mis meetstories</button>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(App);
