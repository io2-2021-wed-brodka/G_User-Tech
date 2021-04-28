import {BASE_URL} from "./urls"
import {axiosHandleResponse, getRequestConfig, IApiResponse} from "./ApiUtils"
import {Bike} from "./bikeApi"
import axios from "axios";

const station_active_url = BASE_URL + "stations/active/";

export enum StationState {
    Working, Blocked,
}

export interface Station {
    id: string;
    state: StationState;
    name: string;
    bikes: Bike[];
}

interface Stations{
    stations: Station[];
}

export const getActiveStations = async (): Promise<IApiResponse<Stations>>  => {
    return axios.get(station_active_url, getRequestConfig())
        .then(r => axiosHandleResponse(r));
}