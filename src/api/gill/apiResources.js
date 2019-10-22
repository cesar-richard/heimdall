import axios from "axios";
import { store } from "../../store";
import { clearSession } from "../../actions/sessionActions";
import { Router } from "react-router-dom";
import heimdalConfig from "../../config";

axios.defaults.baseURL = heimdalConfig.GILL_BASE_API_URL;

const request = (endPoint, method, params, headers = {}, forcedParams = {}) => {
  let config = {
    method: method.toLowerCase(),
    url: `/resources/${endPoint}`,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
    },
    params: {
      system_id: heimdalConfig.SYSTEM_ID,
      event: heimdalConfig.EVENT_ID,
      app_key: heimdalConfig.GILL_APP_KEY,
      ...forcedParams
    }
  };

  let token;
  try {
    token =
      null === store.getState().session
        ? null
        : store.getState().session.access_token.sessionid;
  } catch (e) {
    store.dispatch(clearSession());
    window.location.href = "/";
  }

  config[method === "get" ? "params" : "data"] =
    method === "get" ? { ...config.params, ...params } : params;
  config.params = {
    ...config.params
  };

  if (token) {
    config.params.sessionid = token;
  }

  return axios(config).catch(err => {
    let { response } = err;
    //console.log(err.message);
    if (
      response &&
      (response.status === 401 ||
        (response.status === 403 &&
          response.data.error &&
          response.data.error.message === "User must be logged"))
    ) {
      store.dispatch(clearSession());
      window.location.assign("/");
    }

    response = response || { data: {} };
    const errorObject = {
      config: response.config,
      status: response.status,
      message:
        "Gill said : " + (response.data || {}).message ||
        (response.data || {}).error.message ||
        "An unknown error occurred."
    };

    throw errorObject;
  });
};

export function GET(endPoint, params, headers, forcedParams = {}) {
  return request(endPoint, "get", params, headers, forcedParams);
}

export function POST(endPoint, params, headers, forcedParams = {}) {
  return request(endPoint, "post", params, headers, forcedParams);
}

export function PUT(endPoint, params, headers, forcedParams = {}) {
  return request(endPoint, "put", params, headers, forcedParams);
}

export function PATCH(endPoint, params, headers, forcedParams = {}) {
  return request(endPoint, "patch", params, headers, forcedParams);
}

export function DELETE(endPoint, params, headers, forcedParams = {}) {
  return request(endPoint, "delete", params, headers, forcedParams);
}
