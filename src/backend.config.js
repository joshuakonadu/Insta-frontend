import axios from "axios";
import {authentication} from "@/store/authentication.module";

export const BackendConfig = {
    baseURL: "http://localhost:5000/api",
    images: "/static/images",
};
export const ApiClient = axios.create({
    baseURL: BackendConfig.baseURL,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        authorization: "Bearer " + authentication.state.user,
    },
});