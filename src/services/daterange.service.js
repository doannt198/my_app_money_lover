import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";

class DateRangeService {

  getDateRanges() {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Transaction/GetTransactionDateRange`)
  }
}

export default new DateRangeService();