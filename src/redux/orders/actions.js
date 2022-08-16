import {
    ERROR_FETCHING_ORDERS,
    SET_DATE,
    SET_PAGE,
    START_FETCHING_ORDERS,
    SUCCESS_FETCHING_ORDERS,
} from "./const";

import debounce from "debounce-promise";
import moment from "moment";
import { getData } from "../../utils/fetch";
import { formatFullDate } from "../../utils/formatDate";
import { clearNotif } from "../notif/actions";

let debouncedFetchOrders = debounce(getData, 1000);

export const startFetchingOrders = () => {
    return {
        type: START_FETCHING_ORDERS,
    };
};

export const successFetchingOrders = ({ datas, pages, total }) => {
    return {
        type: SUCCESS_FETCHING_ORDERS,
        datas,
        pages,
        total,
    };
};

export const errorFetchingOrders = () => {
    return {
        type: ERROR_FETCHING_ORDERS,
    };
};

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingOrders());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 5000);

            let params = {
                page: getState().orders?.page || 1,
                limit: getState().orders?.limit || 10,
                startDate: moment(getState().orders?.date?.startDate).format(
                    "YYYY-MM-DD"
                ),
                endDate: moment(getState().orders?.date?.endDate).format(
                    "YYYY-MM-DD"
                ),
            };

            let res = await debouncedFetchOrders("/cms/orders", params);

            const temp = [];
            res.data.data.datas.forEach((res) => {
                temp.push({
                    name: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`,
                    email: res.personalDetail.email,
                    date: res.date,
                    title: res.historyEvent.title,
                    eventDate: formatFullDate(res.historyEvent.date),
                    venueName: res.historyEvent.venueName,
                    status: res.status,
                });
            });

            dispatch(
                successFetchingOrders({
                    datas: temp,
                    pages: res.data.data.pages,
                    total: res.data.data.total,
                })
            );
        } catch (error) {
            dispatch(errorFetchingOrders());
        }
    };
};

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page,
    };
};

export const setDate = (ranges) => {
    return {
        type: SET_DATE,
        ranges,
    };
};
