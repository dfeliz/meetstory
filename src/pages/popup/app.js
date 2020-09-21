import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import {
  ButtonStyle1,
  ButtonStyle2,
  Container1,
  Container2,
  Container3,
  Header1,
  Header2,
  Background,
} from "./components";

class App extends Component {
  render() {
    return (
      <div style={Background}>
        <h1 style={Header1}>Meetstory for Google Meets</h1>
        <div style={Container1}>
          <button style={ButtonStyle1}>Empezar a guardar</button>
        </div>
        <div style={Container2}>
          <h1 style={Header2}>Guardar chats automaticamente</h1>
        </div>
        <div style={Container3}>
          <button style={ButtonStyle2}>Mis meetstories</button>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(App);
