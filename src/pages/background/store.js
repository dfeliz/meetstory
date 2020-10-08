import { createStore } from 'redux';
import { createBackgroundStore } from 'redux-webext';
import { persistStore, persistReducer } from 'redux-persist'
import createChromeStorage from 'redux-persist-chrome-storage'
import reducer from './reducers';
import {
    toggleSave,
    enableSaveButton,
    disableSaveButton,
} from './actions';

const storage = createChromeStorage(window.chrome, 'sync');

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
// const persistor = persistStore(store)

export default createBackgroundStore({
    store,
    actions: {
        TOGGLE_SAVE: toggleSave,
        TOGGLE_BUTTON_ENABLE: enableSaveButton,
        TOGGLE_BUTTON_DISABLE: disableSaveButton,
    }
});
