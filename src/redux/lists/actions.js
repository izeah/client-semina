import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import {
    ERROR_FETCHING_LIST_CATEGORIES,
    ERROR_FETCHING_LIST_EVENTS,
    ERROR_FETCHING_LIST_TALENTS,
    START_FETCHING_LIST_CATEGORIES,
    START_FETCHING_LIST_TALENTS,
    SUCCESS_FETCHING_LIST_CATEGORIES,
    SUCCESS_FETCHING_LIST_EVENTS,
    SUCCESS_FETCHING_LIST_TALENTS,
} from "./const";

let debouncedFetchListCategories = debounce(getData, 1000);
let debouncedFetchListTalents = debounce(getData, 1000);
let debouncedFetchListEvents = debounce(getData, 1000);

export const startFetchingListCategories = () => {
    return {
        type: START_FETCHING_LIST_CATEGORIES,
    };
};

export const successFetchingListCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_LIST_CATEGORIES,
        categories,
    };
};

export const errorFetchingListCategories = () => {
    return {
        type: ERROR_FETCHING_LIST_CATEGORIES,
    };
};

export const fetchListCategories = () => {
    return async (dispatch) => {
        dispatch(startFetchingListCategories());

        try {
            const res = await debouncedFetchListCategories("/cms/categories");

            let temp = [];
            res.data.data.datas.forEach((res) => {
                temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: "category" }, // based on object existing CommonJS
                });
            });

            dispatch(successFetchingListCategories({ categories: temp }));
        } catch (error) {
            dispatch(errorFetchingListCategories());
        }
    };
};

export const startFetchingListTalents = () => {
    return {
        type: START_FETCHING_LIST_TALENTS,
    };
};

export const successFetchingListTalents = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_LIST_TALENTS,
        talents,
    };
};

export const errorFetchingListTalents = () => {
    return {
        type: ERROR_FETCHING_LIST_TALENTS,
    };
};

export const fetchListTalents = () => {
    return async (dispatch) => {
        dispatch(startFetchingListTalents());

        try {
            let res = await debouncedFetchListTalents("/cms/talents");

            let temp = [];

            res.data.data.datas.forEach((res) => {
                temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: "talent" }, // based on object existing CommonJS
                });
            });

            dispatch(successFetchingListTalents({ talents: temp }));
        } catch (error) {
            dispatch(errorFetchingListTalents());
        }
    };
};

export const startFetchingListEvents = () => {
    return {
        type: START_FETCHING_LIST_TALENTS,
    };
};

export const successFetchingListEvents = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_LIST_EVENTS,
        events,
    };
};

export const errorFetchingListEvents = () => {
    return {
        type: ERROR_FETCHING_LIST_EVENTS,
    };
};

export const fetchListEvents = () => {
    return async (dispatch) => {
        dispatch(startFetchingListEvents());

        try {
            let res = await debouncedFetchListEvents("/cms/events");

            let temp = [];

            res.data.data.datas.forEach((res) => {
                temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: "event" },
                });
            });

            dispatch(successFetchingListEvents({ events: temp }));
        } catch (error) {
            dispatch(errorFetchingListEvents());
        }
    };
};
