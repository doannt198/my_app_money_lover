
import { combineReducers } from "redux";
import transactionReducer from './transaction';
import walletReducer from './wallet.reducer';
import loadingReducer from './loading.reducer';
const rootReducer = combineReducers({
    transaction: transactionReducer,
    wallet: walletReducer,
    loading: loadingReducer
});

export default rootReducer;