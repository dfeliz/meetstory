import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import {INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER, INCREMENT_CONTENTSCRIPTS_COUNTER} from '../constants';
import reducer from './reducers';
import {incrementUICounter, decrementUICounter, incrementContentScriptsCounter} from './actions';

const store = createStore(reducer);

export default createBackgroundStore({
    store,
    actions: {
        INCREMENT_UI_COUNTER: incrementUICounter,
        DECREMENT_UI_COUNTER: decrementUICounter,
        INCREMENT_CONTENTSCRIPTS_COUNTER: incrementContentScriptsCounter,
    }
});
