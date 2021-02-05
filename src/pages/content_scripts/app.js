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

var intervalID = null;
var outisdeManualButtonActive = false;
var chatFound = false;

class App extends Component {
    state = {
        isManualButtonActive: false,
    }

    componentDidMount() {
        this.observeMeeting()
            .then(() => {
                // console.log('Chat detected. Checking orders.');
                chatFound = true;
                getAutoSave().then((isAutoSaveEnabled) => {
                    const { isSaving: isManualButtonActive } = this.props;
                    
                    if (isManualButtonActive) {
                        outisdeManualButtonActive = true;
                    }

                    if (isManualButtonActive || isAutoSaveEnabled) {
                        intervalID = this.startSavingChat();
                    }
                })
            })
            .catch((err) => console.log('Meeting observer throwed an error.', err));
    }

    componentDidUpdate() {
        const { isSaving: isManualButtonActive } = this.props;

        if (!isManualButtonActive && outisdeManualButtonActive) {
            this.stopInterval();
            outisdeManualButtonActive = false;
            return;
        }

        const interval = this.startSavingChat()
        intervalID = interval;

        if (isManualButtonActive && !outisdeManualButtonActive) {
            outisdeManualButtonActive = true;
        }
    }

    observeMeeting = () => {
        return new Promise((resolve) => {
            const appContainerElement = document.querySelector(applicationContainer);
            
            const callback = (mutationsList, observer) => {
                let targetDetected = false;
                for(const mutation of mutationsList) {
                    const jsNames = [sidePanelJsName, sidePanelChildJsName];
                    const isSidePanel = jsNames.includes(mutation?.target?.attributes?.jsname?.value)
                    
                    if (isSidePanel) {
                        const element = document.querySelector(chatLayoutSelector);
                        if (element !== null) {
                            listenTabClose();
                            targetDetected = true;
                            observer.disconnect();
                        }
                    }
                }
                if (targetDetected) {
                    resolve(true);
                }
            };
    
            const observerConfig = {
                childList: true,
                subtree: true,
            };
    
            const mutationObserver = new MutationObserver(callback);
    
            mutationObserver.observe(appContainerElement, observerConfig);
        })
    }

    startSavingChat = () => {
        if (chatFound) {
            const chat = {
                title: document.querySelector(meetTitle).innerHTML,
                code: document.title.slice(7),
            }
            chrome.runtime.sendMessage({ messageType: "create", message: chat });
    
            if (document.querySelector(chatLayoutSelector)) {
                intervalID = setInterval(this.getChats, 1500);
                return intervalID;
            }
        } else {
            console.log('Tried to save but tool is not ready.');
        }
    }

    getChats() {
        chrome.runtime.sendMessage({ messageType: "getUrl" }, (response) => {
            // console.log('[URL]: ', response);
        });
        const chatChildrenArray = Array.from(document.querySelector(chatContainerSelector).childNodes);
        const dialogs = chatChildrenArray.map(chatChildrenMapper).reduce((a, b) => [...a, ...b], []);
        chrome.runtime.sendMessage({ messageType: "update", message: dialogs }, (response) => {
            // console.log('[APP]: ', response.message);
        });
    }

    stopInterval = () => {
        clearInterval(intervalID)
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect(state => state, actions)(App);
