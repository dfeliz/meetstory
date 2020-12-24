import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { chatChildrenMapper } from './mappers';
import { getAutoSave, listenTabClose } from './services';
import {
    meetTitle,
    sidePanelJsName,
    chatLayoutSelector,
    applicationContainer,
    chatContainerSelector,
    sidePanelChildJsName
} from '../../selectors';

let intervalRunning = false;
let intervalID;

class App extends Component {
    state = {
        isAutoSaveEnabled: false,
    }

    componentDidMount() {
        const { toggleSave, isSaving } = this.props;
        if (isSaving) {
            toggleSave();
        }

        getAutoSave().then((response) => {
            this.setState({ isAutoSaveEnabled: response }, this.observeMeeting)
        })
    }

    componentDidUpdate() {
        this.saveChat();
    }

    observeMeeting = () => {
        const { isAutoSaveEnabled } = this.state;
        if (isAutoSaveEnabled) {
            const appContainerElement = document.querySelector(applicationContainer);
            
            const callback = (mutationsList, observer) => {
                let startSaving = false;
                for(const mutation of mutationsList) {
                    const jsNames = [sidePanelJsName, sidePanelChildJsName];
                    const isSidePanel = jsNames.includes(mutation?.target?.attributes?.jsname?.value)
                    
                    if (isSidePanel) {
                        const element = document.querySelector(chatLayoutSelector);
                        if (element !== null) {
                            listenTabClose();
                            startSaving = true;
                            observer.disconnect();
                        }
                    }
                }
                if (startSaving) {
                    toggleSave(true);
                }
            };

            const observerConfig = {
                childList: true,
                subtree: true,
            };

            const mutationObserver = new MutationObserver(callback);

            mutationObserver.observe(appContainerElement, observerConfig);
        }
    }

    saveChat = () => {
        const { isSaving } = this.props;

        if (isSaving) {

            const chat = {
                title: document.querySelector(meetTitle).innerHTML,
                code: document.title.slice(7),
            }
            chrome.runtime.sendMessage({ messageType: "create", message: chat }, (response) => {
            });

            if (document.querySelector(chatLayoutSelector)) {
                intervalID = setInterval(this.getChats, 1500);
                intervalRunning = true;
            } else {
            }
        } else {
            if (intervalRunning) {
                intervalRunning = false;
                clearInterval(intervalID);
            }
        }
    }

    getChats() {
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
            <div></div>
        );
    }
}

export default connect(state => state, actions)(App);
