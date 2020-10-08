import { combineReducers } from 'redux';
import {
    TOGGLE_SAVE,
    TOGGLE_BUTTON_ENABLE,
    TOGGLE_BUTTON_DISABLE,
} from '../constants';

function isSavingReducer(state = false, action) {
    switch (action.type) {
        case TOGGLE_SAVE:
            return !state;
        default:
            return state;
    }
}

function toggleSaveButtonEnableReducer(state = false, action) {
    switch (action.type) {
        case TOGGLE_BUTTON_ENABLE:
            return true;
        case TOGGLE_BUTTON_DISABLE:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    isSaving: isSavingReducer,
    isSaveButtonEnabled: toggleSaveButtonEnableReducer,
});
