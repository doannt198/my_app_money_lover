import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";
import * as querystring from 'query-string';

class DeviceService {
  setDevice(device) {
    return axiosInstance.post(`${CONSTANTS.BASE_API}/Device`, device)
  }

  getDevices(filter, accountId, offSet, pageSize){
    const params = querystring.stringify({
      filter, accountId, offSet, pageSize
    });
    return axiosInstance.get(`${CONSTANTS.BASE_API}/Device?${params}`)
  }

  deleteDevice(deviceId) {
    return axiosInstance.delete(`${CONSTANTS.BASE_API}/Device/${deviceId}`)
  }
}

export default new DeviceService();