import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";

class BudgetService {

  getBudget() {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Package?offSet=${offset}&pageSize=${pageSize}`)
  }
}

export default new BudgetService();