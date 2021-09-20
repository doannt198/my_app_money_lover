
import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";
import * as querystring from 'query-string';
class TransactionService {

  createorEditTransactions(transaction) {
    return axiosInstance.post(CONSTANTS.BASE_API+"/Transaction" , transaction);
  }

  getTransactionsById(id) {
    return axiosInstance.get(CONSTANTS.BASE_API+`/Transaction/${id}`);
  }

  getTransactions(filter, month, year, accountId, walletId, offSet, pageSize){
    const params = querystring.stringify({
      filter, month, year, accountId, walletId, offSet, pageSize
    });
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Transaction?${params}`)
  }
  
  deleteTransaction(id){
    return axiosInstance.delete(CONSTANTS.BASE_API+`/Transaction/${id}`);
  }

  getDateRange(startDate = null, endDate = null) {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Transaction/GetTransactionDateRange?startDate=${startDate}&endDate=${endDate}`)
  }

}

export default new TransactionService();