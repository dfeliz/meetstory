import {combineReducers} from 'redux';
import {
    TOGGLE_SAVE,
} from '../constants';

function isSavingReducer(state = false, action) {
    switch (action.type) {
        case TOGGLE_SAVE:
            return !state;
        default:
            return state;
    }
}

export default combineReducers({
    isSaving: isSavingReducer,
});
