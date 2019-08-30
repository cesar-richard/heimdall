import axios from "axios";
import { store } from "../../store";
import { clearSession } from "../../actions/sessionActions";
import { Router } from "react-router-dom";

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
    system_id: ***REMOVED***,
    event: 1,
    app_key: "***REMOVED***"
  };

  if (token) {
    config.params.sessionid = token;
  }

  return axios(config).catch(err => {
    let { response } = err;
    console.log(err.message);
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
