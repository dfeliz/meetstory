import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';
import { OBTAIN_TEXT } from '../constants';
import { persistStore, persistReducer } from 'redux-persist'
import createChromeStorage from 'redux-persist-chrome-storage'
import reducer from './reducers';
import {obtainText} from './actions';

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
        OBTAIN_TEXT: obtainText,
    }
});
