import { BASE_URL } from "./urls";
import axios from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
  handleError,
  IApiResponse,
} from "./ApiUtils";

export enum BikeStatus {
  Available,
  Rented,
  Reserved,
  Blocked,
}

export interface Bike {
  id: string;
  status: BikeStatus;
  station?: {
    id: string;
    name: string;
  };
}

interface Bikes {
  bikes: Bike[];
}

export const getBikesAtStation = async (
  stationId: string
): Promise<IApiResponse<Bikes>> => {
  return axios
    .get(`${BASE_URL}stations/${stationId}/bikes/`, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const rentBike = async (bikeId: string) => {
  return axios
    .post(`${BASE_URL}bikes/rented/`, { id: bikeId }, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const reserveBike = async (bikeId: string) => {
  return axios
    .post(`${BASE_URL}bikes/reserved/`, { id: bikeId }, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const getRentedBikes = async (): Promise<IApiResponse<Bikes>> => {
  return axios
    .get(`${BASE_URL}bikes/rented/`, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const getReservedBikes = async (): Promise<IApiResponse<Bikes>> => {
  return axios
    .get(`${BASE_URL}bikes/reserved/`, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const returnBike = async (bikeId: string, stationId: string) => {
  return axios
    .post(
      `${BASE_URL}stations/${stationId}/bikes/`,
      { id: bikeId },
      getRequestConfig()
    )
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const cancelReservation = async (bikeId: string) => {
  return axios
    .delete(`${BASE_URL}bikes/reserved/${bikeId}/`, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};
