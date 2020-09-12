import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

class App extends Component {
    static propTypes = {
        backgroundCounter: PropTypes.number.isRequired,
        uiCounter: PropTypes.number.isRequired,
        incrementUICounter: PropTypes.func.isRequired,
        decrementUICounter: PropTypes.func.isRequired,
        contentScriptsCounter: PropTypes.number.isRequired
    };

    render() {
        const {
            backgroundCounter,
            uiCounter,
            incrementUICounter,
            decrementUICounter,
            contentScriptsCounter
        } = this.props;

        return (
            <div style={{width: 200}}>
                <div>
                    Background counter: {backgroundCounter}
                </div>
                <div>
                    UI counter: {uiCounter}
                    <div>
                        <button onClick={decrementUICounter}>-</button>
                        <span> </span>
                        <button onClick={incrementUICounter}>+</button>
                    </div>
                </div>
                <div>
                    Content Scripts counter: {contentScriptsCounter}
                </div>
            </div>
        );
    }
}

export default connect(state => state, actions)(App);
