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
import { clearNotif } from "../notif/actions";

let debouncedFetchOrders = debounce(getData, 1000);

export const startFetchingOrders = () => {
    return {
        type: START_FETCHING_ORDERS,
    };
};

export const successFetchingOrders = ({ orders, pages }) => {
    return {
        type: SUCCESS_FETCHING_ORDERS,
        orders,
        pages,
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
            moment.locale("id");
            res.data.data.order.forEach((res) => {
                temp.push({
                    name: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`,
                    email: res.personalDetail.email,
                    date: res.date,
                    title: res.historyEvent.title,
                    eventDate: moment(res.historyEvent.date)
                        .locale("id")
                        .format("DD MMMM YYYY"),
                    venueName: res.historyEvent.venueName,
                    status: res.status,
                });
            });

            dispatch(
                successFetchingOrders({
                    orders: temp,
                    pages: res.data.data.pages,
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
