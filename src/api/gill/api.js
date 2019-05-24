import axios from "axios";
import { store } from "../../store";
import { clearSession } from "../../actions/sessionActions";

const request = (endPoint, method, params, headers = {}) => {
  let config = {
    method: method.toLowerCase(),
    url: "https://api.nemopay.net/services/" + endPoint,
    headers: headers
  };

  const token =
    null === store.getState().session
      ? null
      : store.getState().session.access_token.sessionid;

  config[method === "get" ? "params" : "data"] = params;
  config.params = {
    ...config.params,
    system_id: 80405,
    app_key: "0a93e8e18e6ed78fa50c4d74e949801b"
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
      message: (response.data || {}).message || "An unknown error occurred."
    };

    throw errorObject;
  });
};

export function GET(endPoint, params) {
  return request(endPoint, "get", params);
}

export function POST(endPoint, params) {
  return request(endPoint, "post", params);
}

export function PUT(endPoint, params) {
  return request(endPoint, "put", params);
}

export function PATCH(endPoint, params) {
  return request(endPoint, "patch", params);
}

export function DELETE(endPoint, params) {
  return request(endPoint, "delete", params);
}
