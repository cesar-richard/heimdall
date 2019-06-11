import axios from "axios";
import { store } from "../../store";
import { clearSession } from "../../actions/sessionActions";

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

  const token =
    null === store.getState().session
      ? null
      : store.getState().session.access_token.sessionid;

  config[method === "get" ? "params" : "data"] = params;
  config.params = {
    ...config.params,
    ...forcedParams,
    system_id: ***REMOVED***,
    app_key: "***REMOVED***"
  };

  if (token) {
    config.params.sessionid = token;
  }

  return axios(config).catch(err => {
    let { response } = err;
    if (response && response.status === 401) {
      store.dispatch(clearSession());
    }

    response = response || {};
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
