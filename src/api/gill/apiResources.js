import axios from "axios";
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
      app_key: heimdalConfig.GILL_APP_KEY,
      ...forcedParams
    }
  };

  const token = localStorage.hasOwnProperty("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken")).sessionid
    : null;

  config["get" === method ? "params" : "data"] =
    "get" === method ? { ...config.params, ...params } : params;
  config.params = {
    ...config.params
  };

  if (token) {
    config.params.sessionid = token;
  }

  return axios(config).catch(err => {
    if (err === undefined) {
      throw "unknown error";
    }
    let { response } = err;
    if (response && 401 === response.status) {
      window.location.assign("/logout");
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
