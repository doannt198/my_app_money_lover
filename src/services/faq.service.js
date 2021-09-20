import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";

class FaqService {

  getFaq(filter,offSet,pageSize) {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Faq?filter=${filter}&offSet=${offSet}&pageSize=${pageSize}`)
  }
 
}

export default new FaqService();