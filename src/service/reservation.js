import axios from "../util/axios";

//getLocation
export function getLocation() {
    return axios.get("/display/locations");
}

//getDate
export function getDate(param) {
    return axios.get("/display/availability?locationName=" + param);
}

//make reservation
export function makeReservation(param) {
    return axios.post("/user/reserve", param);
}