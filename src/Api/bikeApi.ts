import {BASE_URL} from "./urls"
import axios from "axios";
import {axiosHandleResponse, getRequestConfig} from "./ApiUtils";

export enum BikeStatus {
    Available, Rented, Reserved, Blocked,
}

export interface Bike {
    id: string;
    status: BikeStatus;
    station?: {
        id: string;
        name: string;
    };
}

export const getBikesAtStation = async (stationId: string) => {
    return axios.get(`${BASE_URL}stations/${stationId}/bikes/`, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}

export const rentBike = async (bikeId: string) => {
    return axios.post(`${BASE_URL}bikes/rented/`, {"id": bikeId}, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}