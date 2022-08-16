import {
    ERROR_FETCHING_TALENTS,
    SET_KEYWORD,
    SET_PAGE,
    START_FETCHING_TALENTS,
    SUCCESS_FETCHING_TALENTS,
} from "./const";

import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";

let debouncedFetchTalents = debounce(getData, 1000);

export const startFetchingTalents = () => {
    return {
        type: START_FETCHING_TALENTS,
    };
};

export const successFetchingTalents = ({ datas, pages, total }) => {
    return {
        type: SUCCESS_FETCHING_TALENTS,
        datas,
        pages,
        total,
    };
};

export const errorFetchingTalents = () => {
    return {
        type: ERROR_FETCHING_TALENTS,
    };
};

export const fetchTalents = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingTalents());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 5000);

            let params = {
                page: getState().talents?.page || 1,
                limit: getState().talents?.limit || 10,
                keyword: getState().talents.keyword,
            };

            let res = await debouncedFetchTalents("/cms/talents", params);

            res.data.data.datas.forEach((res) => {
                res.avatar = res.image.name;
            });

            dispatch(
                successFetchingTalents({
                    datas: res.data.data.datas,
                    pages: res.data.data.pages,
                    total: res.data.data.total,
                })
            );
        } catch (err) {
            dispatch(errorFetchingTalents());
        }
    };
};

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword,
    };
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page,
    };
};
