import { ActionTypes } from "../common/redux.constant"
import walletService from "../services/wallet.service"

export const reloadWallet = () => {
    return {
        type: ActionTypes.REFRESH_WALLET
    }
}

export const getWalletRequest = (accountId) => {
    return dispatch => {
        return walletService.getWallet('', accountId, 0, 100)
        .then(response => {
            dispatch(getWallet(response.data.Data.Data));
        });
    }
}

export const getWallet = (wallets) => {
    return {
        type: ActionTypes.GET_WALLET_SUCCESS,
        wallets
    }
}

export const setActiveWallet = (wallet) => {
    return {
        type: ActionTypes.SET_ACTIVE_WALLET,
        wallet
    }
}