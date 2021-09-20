import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";
import * as querystring from 'query-string';

class WalletService {
  getWallet(filter, offSet, pageSize) {
    const params = querystring.stringify({
      filter, offSet, pageSize
    });
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Wallet?${params}`)
  }
 
  getWalletByAccountId(filter, accountId, offSet, pageSize) {
    const params = querystring.stringify({
      filter, accountId, offSet, pageSize
    });
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Wallet/GetWalletsByAccountId?${params}`)
  }

  updateAmount(id, amount) {
    const params = querystring.stringify({
      id, amount
    });
    return axiosInstance.put(`${CONSTANTS.BASE_API}/Wallet/UpdateAmount?${params}`, null)
  }

  transferWallet(data) {
    return axiosInstance.post(`${CONSTANTS.BASE_API}/Wallet/TransferMoney`, data)
  }

  setWallet(data) {
    return axiosInstance.post(`${CONSTANTS.BASE_API}/Wallet`, data)
  }

  deleteWallet(id) {
    return axiosInstance.delete(`${CONSTANTS.BASE_API}/Wallet/` + id)
  }
}

export default new WalletService();