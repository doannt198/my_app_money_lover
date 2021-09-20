import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";
import FilterModel from "../models/filter.model";
class PackageService {

  getPackages(query) {
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Package?filter=${query.filter}&offSet=${query.offSet}&pageSize=${query.pageSize}`)
  }

  createorEditPackage(datapackage) {
    return axiosInstance.post(CONSTANTS.BASE_API+"/Package", datapackage);
  }
  deletePackage(id){
    return axiosInstance.delete(CONSTANTS.BASE_API+`/Package/${id}`);
  }
}

export default new PackageService();