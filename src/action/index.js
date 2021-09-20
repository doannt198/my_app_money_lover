import * as Types from './../constants/ActionType';

export const actFetchTransactions = (transaction) =>{
    return{
        Types: Types.FETCH_TRANSACTION,
        payload: transaction
    }
}