import {combineReducers} from 'redux';
import {
    OBTAIN_TEXT,
} from '../constants';

function canCaptureReducer(state = false, action) {
    switch (action.type) {
        case OBTAIN_TEXT:
            return true;
        default:
            return state;
    }
}

export default combineReducers({
    canCapture: canCaptureReducer,
});
