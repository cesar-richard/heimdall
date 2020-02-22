import axios from "axios";
import heimdalConfig from "../../config";

axios.defaults.baseURL = heimdalConfig.GILL_BASE_API_URL;

const request = (
  type,
  endPoint,
  method,
  params,
  headers = {},
  forcedParams = {}
) => {
  if (!["resources", "services"].includes(type)) {
    throw new Error("Invalid request type");
  }
  let config = {
    method: method.toLowerCase(),
    url: `/${type}/${endPoint}`,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
    },
    params: {
      app_key: "services" === type ? heimdalConfig.GILL_APP_KEY : null,
      ...forcedParams
    }
  };

  const token = localStorage.hasOwnProperty("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken")).sessionid
    : null;
  if (token) {
    config.params.sessionid = token;
  }
  //SAME
  if ("get" === method) {
    config.params = { ...config.params, ...params };
  } else {
    config.data = params;
  }

  return axios(config).catch(err => {
    let { response } = err;
    if (response && 401 === response.status) {
      window.location.assign("/logout");
    }
    throw err;
  });
};

export function GET(type, endPoint, params, headers, forcedParams = {}) {
  return request(type, endPoint, "get", params, headers, forcedParams);
}

export function POST(type, endPoint, params, headers, forcedParams = {}) {
  return request(type, endPoint, "post", params, headers, forcedParams);
}

export function PUT(type, endPoint, params, headers, forcedParams = {}) {
  return request(type, endPoint, "put", params, headers, forcedParams);
}

export function PATCH(type, endPoint, params, headers, forcedParams = {}) {
  return request(type, endPoint, "patch", params, headers, forcedParams);
}

export function DELETE(type, endPoint, params, headers, forcedParams = {}) {
  return request(type, endPoint, "delete", params, headers, forcedParams);
}
