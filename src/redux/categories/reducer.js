import {
    ERROR_FETCHING_CATEGORIES,
    START_FETCHING_CATEGORIES,
    SUCCESS_FETCHING_CATEGORIES,
} from "./const";

const statusList = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
};

const initialState = {
    status: statusList.idle,
    data: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statusList.process,
            };
        case SUCCESS_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statusList.success,
                data: action.data,
            };
        case ERROR_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statusList.error,
                message: action.message,
            };
        default:
            return state;
    }
}
