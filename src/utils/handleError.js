import axios from "axios";
import { seminaApiUrl } from "../config";

const handleError = (error) => {
    // console.log("Error response");
    // console.log(error?.response?.data?.msg || null);
    // console.log("Error");
    // console.log(error);
    // console.log("Status Code");
    // console.log(error?.response?.status);
    // console.log("Message");
    // console.log(error?.message);

    const originalRequest = error.config;
    // console.log("originalRequest");
    // console.log(originalRequest);

    if (error?.response?.data?.msg === "jwt expired") {
        originalRequest._retry = true;
        const session = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : {};

        return axios
            .get(`${seminaApiUrl}/cms/refresh-token/${session.refreshToken}`)
            .then((res) => {
                if (res.data.data) {
                    // console.log("res.data");
                    // console.log(res.data);

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            ...session,
                            token: res.data.data.token,
                        })
                    );
                    originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;
                    return axios(originalRequest);
                }
            })
            .catch((err) => {
                // expired pada saat refresh token (refresh token sudah expired, jadi harus login kembali)
                // console.log("error disini");
                // console.log(err.response);
                // console.log(err?.response?.data?.msg);

                if (err.response?.data?.msg === "jwt expired") {
                    window.location.href = "/login";
                    localStorage.removeItem("auth");
                }
            });
    }

    return error;
};

export default handleError;
