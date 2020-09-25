import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import { persistStore, persistReducer } from 'redux-persist'
import createChromeStorage from 'redux-persist-chrome-storage'
import {INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER, INCREMENT_CONTENTSCRIPTS_COUNTER} from '../constants';
import reducer from './reducers';
import {incrementUICounter, decrementUICounter, incrementContentScriptsCounter} from './actions';

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
        INCREMENT_UI_COUNTER: incrementUICounter,
        DECREMENT_UI_COUNTER: decrementUICounter,
        INCREMENT_CONTENTSCRIPTS_COUNTER: incrementContentScriptsCounter,
    }
});
