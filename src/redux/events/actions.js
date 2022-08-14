import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import {
    ERROR_FETCHING_EVENTS,
    SET_CATEGORY,
    SET_KEYWORD,
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

export const successFetchingEvents = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_EVENTS,
        events,
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
                title: getState().events.keyword,
                category: getState().events?.category?.value || "",
                talent: getState().events?.talent?.value || "",
            };

            let res = await debouncedFetchEvents("/cms/events", params);

            let temp = [];
            res.data.data.forEach((res) => {
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
                    events: temp,
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
