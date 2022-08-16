import {
    ERROR_FETCHING_CATEGORIES,
    SET_KEYWORD,
    SET_PAGE,
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
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
    keyword: "",
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
                data: action.datas,
                pages: action.pages,
                total: action.total,
            };
        case ERROR_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statusList.error,
            };

        case SET_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case SET_KEYWORD:
            return {
                ...state,
                keyword: action.keyword,
            };
        default:
            return state;
    }
}
