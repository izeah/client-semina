import axios from "axios";
import { seminaApiUrl } from "../config";
import handleError from "./handleError";

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

export async function postData(url, payload, formData) {
    try {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        return await axios.post(`${seminaApiUrl}${url}`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": formData
                    ? "multipart/form-data"
                    : "application/json",
            },
        });
    } catch (err) {
        handleError(err);
    }
}

export async function putData(url, payload) {
    try {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        return await axios.put(`${seminaApiUrl}${url}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        handleError(err);
    }
}

export async function deleteData(url) {
    try {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        return await axios.delete(`${seminaApiUrl}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        handleError(err);
    }
}
