import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import Switch from 'react-switch';
import logo from '../../icons/logo.svg'
import {
  PrimaryButton,
  SecondaryButton,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  Title,
  Text,
  Background,
  LogoContainer
} from "./components";

class App extends Component {

  constructor() {
    super();
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(checked) {
    this.setState({checked})
  }
  

  render() {
    return (
      <div style={Background}>
        <div style={LogoContainer}>
          <img src={logo}></img>
          
        </div>
          <h1 style={Title}>Meetstory for Google Meets</h1> 
        <div style={TopContainer}>
          <button style={PrimaryButton}>Empezar a guardar</button>
        </div>
        <div style={MiddleContainer}>
          <Switch className="react-switch" onChange={this.handleChange} checked={this.state.checked}></Switch>
          <h1 style={Text}>Guardar chats automaticamente</h1>
        </div>
        <div style={BottomContainer}>
          <button style={SecondaryButton}>Mis meetstories</button>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(App);
