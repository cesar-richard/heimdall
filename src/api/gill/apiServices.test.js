import axios from "axios";
import { DELETE, GET, PATCH, POST, PUT } from "./apiServices";
jest.mock("axios");
beforeEach(() => {
  localStorage.clear();
});

function test(method, methodName, data) {
  describe(methodName, () => {
    it("Send requests to API", async () => {
      const data = { response: { status: 401 } };
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method("endPoint", [], [])).resolves.toEqual(data);
    });
    it("Send requests to API with forcedParams", async () => {
      const data = { response: { status: 401 } };
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method("endPoint", [], [], [])).resolves.toEqual(data);
    });
    it("Send requests to API with sessionid", async () => {
      localStorage.setItem(
        "accessToken",
        JSON.stringify({ sessionid: "abc123" })
      );
      const data = { response: { status: 401 } };
      axios.mockImplementationOnce(() => Promise.resolve(data));
      await expect(method("endPoint", [], [], [])).resolves.toEqual(data);
    });
    it("Throw Exception on error", async () => {
      const data = {
        response: { config: undefined, message: "Gill said : undefined" },
        status: 401
      };
      axios.mockImplementationOnce(() => Promise.reject(data));
      await expect(method("endPoint", [], [], [])).rejects.toEqual(data);
    });
    it("Throw Exception on empty error", async () => {
      axios.mockImplementationOnce(() => Promise.reject());
      await expect(method("endPoint", [], [], [])).rejects.toEqual();
    });
  });
}

describe("apiServices", () => {
  test(DELETE, "DELETE");
  test(GET, "GET");
  test(PATCH, "PATCH");
  test(POST, "POST");
  test(PUT, "PUT");
});
