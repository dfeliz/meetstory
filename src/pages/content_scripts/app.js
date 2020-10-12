import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import { chatChildrenMapper } from './mappers';
import {
    chatLayoutSelector,
    chatContainerSelector
} from '../../selectors';

let dialogs = [];
let intervalRunning = false;
let intervalID;

class App extends Component {
    static propTypes = {
        isSaving: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        console.log('Content scripts loaded.')
    }
    
    componentDidUpdate() {
        const { isSaving } = this.props;

        if (isSaving) {
            // @TODO: Use real chat
            const chat = {
                title: 'El chat XD',
                code: 'uce-fpsx-rbi',
            }
            chrome.runtime.sendMessage({ messageType: "create", message: chat }, (response) => {
                console.log('[APP]: ', response.message);
            });

            console.log("button has been clicked");
            if (document.querySelector(chatLayoutSelector)) {
                console.log("chatLayout detected");
                intervalID = setInterval(this.getChats, 1500);
                intervalRunning = true;
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
        const chatChildrenArray = Array.from(document.querySelector(chatContainerSelector).childNodes);
        const newDialogs = chatChildrenArray.map(chatChildrenMapper).reduce((a,b) => [...a,...b]);
        dialogs = newDialogs;
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
