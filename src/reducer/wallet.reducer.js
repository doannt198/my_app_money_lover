import { ActionTypes } from "../common/redux.constant";

const initialState = {
    reload: false,
    wallets: [],
    walletActive: null
}


const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_WALLET_SUCCESS:
            return {
                ...state,
                wallets: action.wallets
            };
        case ActionTypes.REFRESH_WALLET:
            return {
                ...state,
                reload: !state.reload
            };
        case ActionTypes.SET_ACTIVE_WALLET:
            return {
                ...state,
                walletActive: action.wallet
            };
        default:
            return {...state};
    }
}

export default walletReducer;