import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

class App extends Component {
    static propTypes = {
        incrementContentScriptsCounter: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        console.log('Content scripts loaded.')
    }

    handleClick = () => {
        const {
            incrementContentScriptsCounter,
            contentScriptsCounter
        } = this.props;
        incrementContentScriptsCounter(1);
        console.log('new count: ', contentScriptsCounter);
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
