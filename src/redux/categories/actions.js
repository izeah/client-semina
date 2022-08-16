import {
    ERROR_FETCHING_CATEGORIES,
    SET_KEYWORD,
    SET_PAGE,
    START_FETCHING_CATEGORIES,
    SUCCESS_FETCHING_CATEGORIES,
} from "./const";

import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";

let debouncedFetchCategories = debounce(getData, 1000);

export const startFetchingCategories = () => {
    return {
        type: START_FETCHING_CATEGORIES,
    };
};

export const successFetchingCategories = ({ datas, pages }) => {
    return {
        type: SUCCESS_FETCHING_CATEGORIES,
        datas,
        pages,
    };
};

export const errorFetchingCategories = () => {
    return {
        type: ERROR_FETCHING_CATEGORIES,
    };
};

export const fetchCategories = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingCategories());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 5000);

            let params = {
                keyword: getState().categories?.keyword,
                page: getState().categories?.page || 1,
                limit: getState().categories?.limit || 10,
            };

            let res = await debouncedFetchCategories("/cms/categories", params);
            dispatch(
                successFetchingCategories({
                    datas: res.data.data.datas,
                    pages: res.data.data.pages,
                })
            );
        } catch (err) {
            console.log(err);
            dispatch(errorFetchingCategories());
        }
    };
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page,
    };
};

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword,
    };
};
