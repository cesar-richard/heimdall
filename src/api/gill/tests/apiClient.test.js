import axios from "axios";
import { DELETE, GET, PATCH, POST, PUT } from "../apiClient";
import heimdalConfig from "../../../config";
import "jest-localstorage-mock";

jest.mock("axios");
beforeEach(() => {
  localStorage.clear();
  jest.resetAllMocks();
  jest.mock("axios");
});

function testInvalidType(method, methodName) {
  describe(methodName, () => {
    it("Should throw an error", async () => {
      try {
        method("InvalidType", "endPoint", [], []);
      } catch (e) {
        expect(e).toBe("Invalid request type");
      }
    });
  });
}

function test(type, method, methodName, data, expectedCallParams) {
  describe(methodName, () => {
    it("Send requests to API", async () => {
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method(type, "endPoint", [], [])).resolves.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Send requests to API with forcedParams", async () => {
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method(type, "endPoint", [], [], null, [])).resolves.toEqual(
        data
      );
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Send requests to API with custom header", async () => {
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method(type, "endPoint", [], [], [])).resolves.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Send requests to API with sessionid", async () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ sessionid: "abc123" })
      );
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method(type, "endPoint", [], [], [])).resolves.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
    it("Throw Exception on error", async () => {
      axios.mockImplementationOnce(() => Promise.reject(data));
      await expect(method(type, "endPoint", [], [], [])).rejects.toEqual(data);
      expect(axios).toHaveBeenCalledWith(expectedCallParams);
    });
  });
}

function testType(type) {
  test(
    type,
    DELETE,
    "DELETE",
    {
      status: undefined,
      config: undefined,
      message: "Gill said : undefined"
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "delete",
      params: {
        app_key: "services" === type ? heimdalConfig.GILL_APP_KEY : null
      },
      url: `/${type}/endPoint`
    }
  );
  test(
    type,
    GET,
    "GET",
    {
      status: undefined,
      config: undefined,
      message: "Gill said : undefined"
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "get",
      params: {
        app_key: "services" === type ? heimdalConfig.GILL_APP_KEY : null
      },
      url: `/${type}/endPoint`
    }
  );
  test(
    type,
    PATCH,
    "PATCH",
    {
      status: undefined,
      config: undefined,
      message: "Gill said : undefined"
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "patch",
      params: {
        app_key: "services" === type ? heimdalConfig.GILL_APP_KEY : null
      },
      url: `/${type}/endPoint`
    }
  );
  test(
    type,
    POST,
    "POST",
    {
      status: undefined,
      config: undefined,
      message: "Gill said : undefined"
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "post",
      params: {
        app_key: "services" === type ? heimdalConfig.GILL_APP_KEY : null
      },
      url: `/${type}/endPoint`
    }
  );
  test(
    type,
    PUT,
    "PUT",
    {
      status: undefined,
      config: undefined,
      message: "Gill said : undefined"
    },
    {
      data: [],
      headers: {
        "Content-Type": "application/json",
        "Nemopay-Version": heimdalConfig.NEMOPAY_VERSION
      },
      method: "put",
      params: {
        app_key: "services" === type ? heimdalConfig.GILL_APP_KEY : null
      },
      url: `/${type}/endPoint`
    }
  );
}

describe("apiClient", () => {
  describe("Resources", () => {
    testType("resources");
  });
  describe("Services", () => {
    testType("services");
  });
  describe("Invalid type", () => {
    testInvalidType(DELETE, "DELETE");
    testInvalidType(GET, "GET");
    testInvalidType(PATCH, "PATCH");
    testInvalidType(POST, "POST");
    testInvalidType(PUT, "PUT");
  });
});
