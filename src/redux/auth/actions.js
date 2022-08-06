import { USER_LOGIN, USER_LOGOUT } from "./const";

export function userLogin(token, role, username) {
    return {
        type: USER_LOGIN,
        token,
        role,
        username,
    };
}

export function userLogout() {
    localStorage.removeItem("auth");
    return {
        type: USER_LOGOUT,
    };
}
