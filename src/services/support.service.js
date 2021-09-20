import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";

class SupportService {

  getSupports(filter,offSet,pageSize) {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Support?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}`)
  }
 
}

export default new SupportService();