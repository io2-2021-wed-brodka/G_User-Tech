import { BASE_URL } from "./urls";
import {
  axiosHandleResponse,
  getRequestConfig,
  handleError,
  IApiResponse,
} from "./ApiUtils";
import { Bike } from "./bikeApi";
import axios from "axios";

const station_active_url = BASE_URL + "stations/active";

export enum StationStatus {
  Active,
  Blocked,
}

export interface Station {
  id: string;
  status: StationStatus;
  name: string;
  activeBikesCount: number;
  bikes: Bike[];
}

interface Stations {
  stations: Station[];
}

export const getActiveStations = async (): Promise<IApiResponse<Stations>> => {
  const err = axios
    .get(station_active_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      //alert(err.response.data.message || err.response.data.detail);
      //TODO alert tech deleted
      handleError(err);
      return err;
    });
  return err;
};
