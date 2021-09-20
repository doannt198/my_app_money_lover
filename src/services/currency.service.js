import axiosInstance from "./axios.service";
import CONSTANTS from "../common/constants";
import * as querystring from 'query-string';

class CurrencyUnitService {
    saveCurrencyUnit(data) {
        return axiosInstance.post(CONSTANTS.BASE_API + "/CurrencyUnit", data);
    }

    getCurrencyUnitById(id) {
        return axiosInstance.get(CONSTANTS.BASE_API + `/CurrencyUnit/${id}`);
    }

    getCurrencyUnits(filter, offSet, pageSize) {
        const params = querystring.stringify({
            filter, offSet, pageSize
        });
        return axiosInstance.get(`${CONSTANTS.BASE_API}/CurrencyUnit?${params}`)
    }

    deleteCurrencyUnit(id) {
        return axiosInstance.delete(CONSTANTS.BASE_API + `/CurrencyUnit/${id}`);
    }

}

export default new CurrencyUnitService();