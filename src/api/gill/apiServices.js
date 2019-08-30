import axios from "axios";
import { store } from "../../store";
import { clearSession } from "../../actions/sessionActions";
import { Router } from "react-router-dom";

const request = (endPoint, method, params, headers = {}, forcedParams = {}) => {
  let config = {
    method: method.toLowerCase(),
    url: "https://api.nemopay.net/services/" + endPoint,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "Nemopay-Version": "2017-12-15"
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
    Router.push("/");
  }

  config[method === "get" ? "params" : "data"] = params;
  config.params = {
    ...config.params,
    ...forcedParams,
    system_id: 80405,
    app_key: "0a93e8e18e6ed78fa50c4d74e949801b"
  };

  if (token) {
    config.params.sessionid = token;
  }

  return axios(config).catch(err => {
    let { response } = err;
    if (
      response &&
      (response.status === 401 ||
        (response.status === 403 &&
          response.data.error.message === "User must be logged"))
    ) {
      store.dispatch(clearSession());
      Router.redirect("/");
    }

    response = response || {};

    console.error(response.data.error);
    let message = response.data.message
      ? response.data.message
      : response.data.error
      ? response.data.error.type
      : "unknown error";
    const errorObject = {
      config: response.config,
      rawData: response.data,
      status: response.status,
      message: "Gill said : " + message
    };

    throw errorObject;
  });
};

export function GET(endPoint, params, headers, forcedParams) {
  return request(endPoint, "get", params, headers, forcedParams);
}

export function POST(endPoint, params, headers, forcedParams) {
  return request(endPoint, "post", params, headers, forcedParams);
}

export function PUT(endPoint, params, headers, forcedParams) {
  return request(endPoint, "put", params, headers, forcedParams);
}

export function PATCH(endPoint, params, headers, forcedParams) {
  return request(endPoint, "patch", params, headers, forcedParams);
}

export function DELETE(endPoint, params, headers, forcedParams) {
  return request(endPoint, "delete", params, headers, forcedParams);
}
