import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";

class BankService {

  getBanks(filter,offSet,pageSize) {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Bank?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}`)
  }
 
}

export default new BankService();