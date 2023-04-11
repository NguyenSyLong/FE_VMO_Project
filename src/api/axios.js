import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL || "";
// export const BASE_URL = "";

export default axios.create({
    baseURL: `${BASE_URL}/api`,
});
const accessToken = localStorage.getItem("accessToken")
export const axiosPrivate = axios.create({
    withCredentials: false,
    headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json"
     },
   
});