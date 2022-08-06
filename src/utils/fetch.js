import axios from "axios";
import { seminaApiUrl } from "../config";
import handleError from "./HandleError";

export async function getData(url, params) {
    try {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        return await axios.get(`${seminaApiUrl}${url}`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        handleError(err);
    }
}

export async function postData(url, payload) {
    const { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    return await axios.post(`${seminaApiUrl}${url}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function putData(url, payload) {
    const { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    return await axios.put(`${seminaApiUrl}${url}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function deleteData(url) {
    const { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    return await axios.delete(`${seminaApiUrl}${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
