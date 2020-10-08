import store from './store';
import {
    TOGGLE_BUTTON_DISABLE, TOGGLE_BUTTON_ENABLE
} from '../constants';

store.dispatch(new Object({ type: TOGGLE_BUTTON_ENABLE }));


