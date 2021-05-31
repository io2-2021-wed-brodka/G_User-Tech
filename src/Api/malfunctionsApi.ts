import { BASE_URL } from "./urls";
import axios from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
  handleError,
  IApiResponse,
} from "./ApiUtils";

export interface Malfunction {
    id: string,
    bikeId: string,
    description: string,
    reportingUserId: string,
};

export const reportMalfunction = async (bikeId: string, description: string) => {
    return axios
      .post(`${BASE_URL}malfunctions/`, { id: bikeId, description: description}, getRequestConfig())
      .then((r) => axiosHandleResponse(r))
      .catch((err) => {
        handleError(err);
        return err;
      });
  };

  export const deleteMalfunction = async (malfunctionId: string) => {
      return axios
        .delete(`${BASE_URL}malfunctions/${malfunctionId}`, getRequestConfig())
        .then((r) => axiosHandleResponse(r))
        .catch((err) => {
          handleError(err);
          return err;
        });
    };

    export const getMalfunctions = async () => {
        return axios
          .get(`${BASE_URL}malfunctions/`, getRequestConfig())
          .then((r) => axiosHandleResponse(r))
          .catch((err) => {
            handleError(err);
            return err;
          });
      };
  