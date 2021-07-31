import axios from "../util/axios";

//Login
export function login(loginParam) {
    return axios.post("/user/login", loginParam);
}
//Register
export function register(registerParam) {
    return axios.post("/user/register", registerParam);
}

//Logout
export function logout(param) {
    return axios.post("/user/logout", param);
}

//UserName
export function getUserName() {
    return axios.get("/user/currentUserName");
}

//UserSSN
export function getUserSSN() {
    return axios.get("/user/currentUserssn");
}

//selfCheck
export function selfCheck(param) {
    return axios.post("/user/selfCheck", param);
}

//otherCheck 
export function otherCheck(param) {
    return axios.post("/user/checkOtherUser", param);
}