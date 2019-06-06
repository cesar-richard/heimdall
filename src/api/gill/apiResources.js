import axios from "axios";
import { store } from "../../store";
import { clearSession } from "../../actions/sessionActions";

const request = (endPoint, method, params, headers = {}) => {
  let config = {
    method: method.toLowerCase(),
    url: "https://api.nemopay.net/resources/" + endPoint,
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
    system_id: SYSTEM,
    app_key: "APIKEY"
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

export function GET(endPoint, params, headers) {
  return request(endPoint, "get", params, headers);
}

export function POST(endPoint, params, headers) {
  return request(endPoint, "post", params, headers);
}

export function PUT(endPoint, params, headers) {
  return request(endPoint, "put", params, headers);
}

export function PATCH(endPoint, params, headers) {
  return request(endPoint, "patch", params, headers);
}

export function DELETE(endPoint, params, headers) {
  return request(endPoint, "delete", params, headers);
}
