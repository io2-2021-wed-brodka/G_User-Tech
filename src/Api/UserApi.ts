import { BASE_URL } from "./urls";
import axios from "axios";
import { AxiosResponse } from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
  handleError,
  IApiResponse,
} from "./ApiUtils";

const login_url = BASE_URL + "login/";
const logout_url = BASE_URL + "logout/";
const register_url = BASE_URL + "register/";

const axiosHandleLoginResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    sessionStorage.setItem("token", response.data.token);
    window.location.href = "/main-menu"; // refresh and redirect to main page
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

const axiosHandleRegisterResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
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

export const postLogin = async (login: string, password: string, role: string) => {
  axios
    .post(login_url, {
      login: login,
      password: password,
      role: role,
    })
    .then((r) => axiosHandleLoginResponse(r))
    .catch((r) => {
      if (r.response.status == 401) alert("Bad credentials");
      else console.log("error");
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

export const postRegister = async (login: string, password: string) => {
  axios
    .post(register_url, {
      login: login,
      password: password,
    })
    .then((r) => axiosHandleRegisterResponse(r))
    .catch((r) => {
      if (r.response.status == 409) alert("Conflicting registration data");
      else console.log("error");
    });
};
