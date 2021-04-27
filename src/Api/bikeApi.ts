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

export const reserveBike = async (bikeId: string) => {
    return axios.post(`${BASE_URL}bikes/reserved/`, {"id": bikeId}, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}

export const getRentedBikes = async () => {
    return axios.get(`${BASE_URL}bikes/rented/`, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}

export const getReservedBikes = async () => {
    return axios.get(`${BASE_URL}bikes/reserved/`, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}

export const returnBike = async (bikeId: string, stationId: string) => {
    return axios.post(`${BASE_URL}stations/${stationId}/bikes/`, {"id": bikeId}, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}

export const cancelReservation = async (bikeId: string) => {
    return axios.delete(`${BASE_URL}bikes/reserved/${bikeId}/`, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}