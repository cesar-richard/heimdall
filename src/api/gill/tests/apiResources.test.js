import axios from "axios";
import { DELETE, GET, PATCH, POST, PUT } from "../apiResources";
import heimdalConfig from "../../../config";
jest.mock("axios");
beforeEach(() => {
  localStorage.clear();
  jest.resetAllMocks();
  jest.mock("axios");
});

function test(method, methodName, data, expectedCallParams) {
  describe(methodName, () => {
    it("Send requests to API", async () => {
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method("endPoint", [], [])).resolves.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Send requests to API with forcedParams", async () => {
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method("endPoint", [], [], [])).resolves.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Send requests to API with sessionid", async () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ sessionid: "abc123" })
      );
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method("endPoint", [], [], [])).resolves.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Throw Exception on error", async () => {
      axios.mockImplementationOnce(() => Promise.reject(data));
      await expect(method("endPoint", [], [], [])).rejects.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Throw Exception on empty error", async () => {
      axios.mockImplementationOnce(() => Promise.reject());
      await expect(method("endPoint", [], [], [])).rejects.toEqual();
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
  });
}

describe("apiResources", () => {
  test(
    DELETE,
    "DELETE",
    {
      response: { config: undefined, message: "Gill said : undefined" },
      status: 401
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "delete",
      params: {
        app_key: heimdalConfig.GILL_APP_KEY
      },
      url: "/resources/endPoint"
    }
  );
  test(
    GET,
    "GET",
    {
      response: { config: undefined, message: "Gill said : undefined" },
      status: 401
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "get",
      params: {
        app_key: heimdalConfig.GILL_APP_KEY
      },
      url: "/resources/endPoint"
    }
  );
  test(
    PATCH,
    "PATCH",
    {
      response: { config: undefined, message: "Gill said : undefined" },
      status: 401
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "patch",
      params: {
        app_key: heimdalConfig.GILL_APP_KEY
      },
      url: "/resources/endPoint"
    }
  );
  test(
    POST,
    "POST",
    {
      response: { config: undefined, message: "Gill said : undefined" },
      status: 401
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "post",
      params: {
        app_key: heimdalConfig.GILL_APP_KEY
      },
      url: "/resources/endPoint"
    }
  );
  test(
    PUT,
    "PUT",
    {
      response: { config: undefined, message: "Gill said : undefined" },
      status: 401
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "put",
      params: {
        app_key: heimdalConfig.GILL_APP_KEY
      },
      url: "/resources/endPoint"
    }
  );
});
