import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";
import AccountModel from "../models/account.model";

class AccountService {
  register(account) {
    return axiosInstance.post(`${CONSTANTS.BASE_API}/Account/SetAccountUser`, account)
  }
}

export default new AccountService();