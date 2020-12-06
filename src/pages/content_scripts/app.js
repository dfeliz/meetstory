import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { chatChildrenMapper } from './mappers';
import {
    meetTitle,
    chatLayoutSelector,
    chatContainerSelector
} from '../../selectors';

let intervalRunning = false;
let intervalID;

class App extends Component {
    constructor(props) {
        super(props);
        console.log('Content scripts loaded.')
    }

    componentDidUpdate() {
        const { isSaving } = this.props;

        if (isSaving) {

            const chat = {
                title: document.querySelector(meetTitle).innerHTML,
                code: document.title.slice(7),
            }
            chrome.runtime.sendMessage({ messageType: "create", message: chat }, (response) => {
                console.log('[APP]: ', response.message);
            });

            console.log("button has been clicked");
            if (document.querySelector(chatLayoutSelector)) {
                console.log("chatLayout detected");
                intervalID = setInterval(this.getChats, 1500);
                intervalRunning = true;
            } else {
                console.log("No se encontro el chat")
            }
        } else {
            if (intervalRunning) {
                console.log("stopped");
                intervalRunning = false;
                clearInterval(intervalID);
            }
        }
    }

    getChats() {
        console.log("started get chat");
        chrome.runtime.sendMessage({ messageType: "getUrl" }, (response) => {
            console.log('[URL]: ', response);
        });
        const chatChildrenArray = Array.from(document.querySelector(chatContainerSelector).childNodes);
        const dialogs = chatChildrenArray.map(chatChildrenMapper).reduce((a, b) => [...a, ...b], []);
        chrome.runtime.sendMessage({ messageType: "update", message: dialogs }, (response) => {
            console.log('[APP]: ', response.message);
        });
    }

    render() {
        return (
            <div id="xdd" onClick={this.handleClick}>
                kakakakaka
            </div>
        );
    }
}

export default connect(state => state, actions)(App);
