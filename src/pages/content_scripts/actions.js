import {INCREMENT_CONTENTSCRIPTS_COUNTER} from '../constants';

export function incrementContentScriptsCounter() {
    return {
        type: INCREMENT_CONTENTSCRIPTS_COUNTER,
        value: 1,
    };
}

