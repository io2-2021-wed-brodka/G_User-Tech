import { BASE_URL } from "./urls";
import axios from "axios";
import { AxiosResponse } from "axios";
import { store } from 'react-notifications-component';
import {
  axiosHandleResponse,
  getRequestConfig,
  handleError,
  IApiResponse,
} from "./ApiUtils";
import { useHistory } from "react-router-dom";

const login_url = BASE_URL + "login/";
const logout_url = BASE_URL + "logout/";
const register_url = BASE_URL + "register/";

export const axiosHandleLoginResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    sessionStorage.setItem("token", response.data.token);
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.data : null,
    };
  } else {
    return {
      isError: true,
      responseCode: response.status,
      errorMessage: await response.data,
    };
  }
};

export const axiosHandleRegisterResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    sessionStorage.setItem("token", response.data.token);
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.data : null,
    };
  } else {
    return {
      isError: true,
      responseCode: response.status,
      errorMessage: await response.data,
    };
  }
};

export const postLogin = async (login: string, password: string, successCallback: any, errorCallback: any) => {
  axios
    .post(login_url, {
      login: login,
      password: password,
      role: "user",
    })
    .then((r) => {successCallback(r)})
    .catch((r) => {
      errorCallback(r)
    });
};

export const postLogout = async () => {
  axios
    .post(logout_url, {}, getRequestConfig())
    .then((r) => {
      axiosHandleResponse(r);
      sessionStorage.clear();
      window.location.href = "/login";
    })
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const postRegister = async (login: string, password: string, successCallback: any, errorCallback: any) => {
  axios
    .post(register_url, {
      login: login,
      password: password,
    })
    .then((r) => {successCallback(r)})
    .catch((r) => {
      errorCallback(r)
    });
};