import {
    ERROR_FETCHING_TALENTS,
    SET_KEYWORD,
    SET_PAGE,
    START_FETCHING_TALENTS,
    SUCCESS_FETCHING_TALENTS,
} from "./const";

const statuslist = {
    idle: "idle",
    process: "process",
    success: "success",
    error: "error",
};

const initialState = {
    status: statuslist.idle,
    data: [],
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
    keyword: "",
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_TALENTS:
            return { ...state, status: statuslist.process };

        case ERROR_FETCHING_TALENTS:
            return { ...state, status: statuslist.error };

        case SUCCESS_FETCHING_TALENTS:
            return {
                ...state,
                status: statuslist.success,
                data: action.datas,
                pages: action.pages,
                total: action.total,
            };

        case SET_KEYWORD:
            return {
                ...state,
                keyword: action.keyword,
            };

        case SET_PAGE:
            return {
                ...state,
                page: action.page,
            };

        default:
            return state;
    }
}
