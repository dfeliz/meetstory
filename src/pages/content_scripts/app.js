import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import { chatChildrenMapper } from './mappers';
import {
    chatLayoutSelector,
    chatContainerSelector
} from '../../selectors';

let dialogs = [];

class App extends Component {
    static propTypes = {
        canCapture: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        console.log('Content scripts loaded.')
    }
    
    componentDidUpdate() {
        const { canCapture } = this.props;

        if (canCapture) {
            console.log("button has been clicked");
            if (document.querySelector(chatLayoutSelector)) {
                console.log("chatLayout detected");
                setInterval(this.getChats, 1500);
            }
        }
    }

    getChats() {
        console.log("actual: ", dialogs);

        const chatChildrenArray = Array.from(document.querySelector(chatContainerSelector).childNodes);
        const newDialogs = chatChildrenArray.map(chatChildrenMapper);

        console.log("new: ", newDialogs);
        dialogs = newDialogs;
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
