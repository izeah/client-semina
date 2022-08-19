import axios from "axios";
import { seminaApiUrl } from "../config";
import handleError from "./handleError";

export function getData(url, params) {
    return new Promise(function (resolve, reject) {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        axios
            .get(`${seminaApiUrl}${url}`, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => resolve(res))
            .catch((err) => {
                reject(err);
                handleError(err);
            });
    });
}

export function postData(url, payload, formData) {
    return new Promise(function (resolve, reject) {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        axios
            .post(`${seminaApiUrl}${url}`, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": formData
                        ? "multipart/form-data"
                        : "application/json",
                },
            })
            .then((res) => resolve(res))
            .catch((err) => {
                reject(err);
                handleError(err);
            });
    });
}

export async function putData(url, payload) {
    return new Promise(function (resolve, reject) {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        axios
            .put(`${seminaApiUrl}${url}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => resolve(res))
            .catch((err) => {
                reject(err);
                handleError(err);
            });
    });
}

export async function deleteData(url) {
    return new Promise(function (resolve, reject) {
        const { token } = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        axios
            .delete(`${seminaApiUrl}${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => resolve(res))
            .catch((err) => {
                reject(err);
                handleError(err);
            });
    });
}
