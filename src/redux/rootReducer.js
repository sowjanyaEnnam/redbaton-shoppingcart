import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart/cartReducer';
import productReducer from './cart/productReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    product : productReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

export default persistReducer(persistConfig, rootReducer);