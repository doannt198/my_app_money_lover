import { ActionTypes } from "../common/redux.constant";

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_LOADING:
            return true;
        default:
            return false;
    }
}

export default loadingReducer;