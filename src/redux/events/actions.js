import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import {
    ERROR_FETCHING_EVENTS,
    SET_CATEGORY,
    SET_KEYWORD,
    SET_PAGE,
    SET_TALENT,
    START_FETCHING_EVENTS,
    SUCCESS_FETCHING_EVENTS,
} from "./const";

let debouncedFetchEvents = debounce(getData, 1000);

export const startFetchingEvents = () => {
    return {
        type: START_FETCHING_EVENTS,
    };
};

export const successFetchingEvents = ({ datas, pages, total }) => {
    return {
        type: SUCCESS_FETCHING_EVENTS,
        datas,
        pages,
        total,
    };
};

export const errorFetchingEvents = () => {
    return {
        type: ERROR_FETCHING_EVENTS,
    };
};

export const fetchEvents = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingEvents());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 5000);

            let params = {
                page: getState().events.page,
                limit: getState().events.limit,
                title: getState().events.keyword,
                // category: getState().events?.category?.value || "", // for single value
                // talent: getState().events?.talent?.value || "", // for single value
            };

            // filter category by array value
            params["category"] = getState().events?.category
                ? getState().events.category.map((item) => item.value)
                : [];

            params["talent"] = getState().events?.talent
                ? getState().events.talent.map((item) => item.value)
                : [];

            let res = await debouncedFetchEvents("/cms/events", params);

            let temp = [];
            res.data.data.datas.forEach((res) => {
                temp.push({
                    _id: res._id,
                    title: res.title,
                    date: res.date,
                    venue: res.venueName,
                    category: res?.category?.name || "",
                    talent: res?.talent?.name || "-",
                    status: res.statusEvent,
                });
            });

            dispatch(
                successFetchingEvents({
                    datas: temp,
                    pages: res.data.data.pages,
                    total: res.data.data.total,
                })
            );
        } catch (error) {
            dispatch(errorFetchingEvents());
        }
    };
};

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword,
    };
};

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category,
    };
};

export const setTalent = (talent) => {
    return {
        type: SET_TALENT,
        talent,
    };
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page,
    };
};
