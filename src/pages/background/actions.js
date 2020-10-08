import {
    TOGGLE_SAVE,
    TOGGLE_BUTTON_ENABLE,
    TOGGLE_BUTTON_DISABLE
} from '../constants';

export function toggleSave() {
    return {
        type: TOGGLE_SAVE
    };
}

export function enableSaveButton() {
    return {
        type: TOGGLE_BUTTON_ENABLE
    }
}

export function disableSaveButton() {
    return {
        type: TOGGLE_BUTTON_DISABLE
    }
}
