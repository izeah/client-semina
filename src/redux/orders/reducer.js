import {
    ERROR_FETCHING_ORDERS,
    SET_DATE,
    SET_PAGE,
    START_FETCHING_ORDERS,
    SUCCESS_FETCHING_ORDERS,
} from "./const";

const statuslist = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
};

const initialState = {
    data: [],
    page: 1,
    limit: 10,
    pages: 1,
    date: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    },
    status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ORDERS:
            return { ...state, status: statuslist.process };

        case ERROR_FETCHING_ORDERS:
            return { ...state, status: statuslist.error };

        case SUCCESS_FETCHING_ORDERS:
            return {
                ...state,
                status: statuslist.success,
                data: action.datas,
                pages: action.pages,
            };

        case SET_PAGE:
            return {
                ...state,
                page: action.page,
            };

        case SET_DATE:
            return {
                ...state,
                date: action.ranges,
            };

        default:
            return state;
    }
}
