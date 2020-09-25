import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

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
        if (canCapture === true) {
            console.log(document.querySelector("#tsf > div:nth-child(2) > div.A8SBwf > div.FPdoLc.tfB0Bf > center > input.gNO89b"));
        }
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
