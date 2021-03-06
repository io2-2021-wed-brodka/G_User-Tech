import { AxiosResponse } from "axios";

export interface IApiResponse<T> {
  isError: boolean;
  errorMessage?: string;
  responseCode: number;
  data?: T;
}

export const handleResponse = async <T>(
  response: Response
): Promise<IApiResponse<T>> => {
  if (response.ok) {
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.json() : null,
    };
  } else {
    return {
      isError: true,
      responseCode: response.status,
      errorMessage: await response.text(),
    };
  }
};
export const axiosHandleResponse = async <T>(
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

export const handleError = async <T>(error: any): Promise<IApiResponse<T>> => {
  switch (error.response.status) {
    case 401:
      alert("Your account was deleted");
      window.location.href = "/login";
      break;
    default:
      alert(error.response.data.message || error.response.data.detail);
      break;
  }
  return error;
};

export const getRequestConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
};
