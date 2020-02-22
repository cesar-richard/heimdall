import { POST } from "../apiClient";
import { login2, loginCas2 } from "../MYACCOUNT";
jest.mock("../apiClient");
beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../apiClient");
});

describe("MYACCOUNT", () => {
  describe("loginCas2", () => {
    it("fetches successfully data from API", async () => {
      const data = [];
      POST.mockImplementationOnce(() => Promise.resolve(data));
      await expect(loginCas2(160677, "ticket", "service")).resolves.toEqual(
        data
      );
      expect(POST).toHaveBeenCalledWith(
        "services",
        "MYACCOUNT/loginCas2",
        { service: "service", ticket: "ticket" },
        {},
        { system_id: 160677 }
      );
    });
    it("fails if no parameters are given", async () => {
      const data = {};
      POST.mockImplementationOnce(() => Promise.resolve(data));
      await expect(loginCas2()).resolves.toEqual(data);
      expect(POST).toHaveBeenCalledWith(
        "services",
        "MYACCOUNT/loginCas2",
        { service: undefined, ticket: undefined },
        {},
        { system_id: undefined }
      );
    });
  });
  describe("login2", () => {
    it("fetches successfully data from API", async () => {
      const data = [];
      POST.mockImplementationOnce(() => Promise.resolve(data));
      await expect(login2(160677, "login", "password")).resolves.toEqual(data);
      expect(POST).toHaveBeenCalledWith(
        "services",
        "MYACCOUNT/login2",
        { login: "login", password: "password" },
        {},
        { system_id: 160677 }
      );
    });
    it("fails if no parameters are given", async () => {
      const data = {};
      POST.mockImplementationOnce(() => Promise.resolve(data));
      await expect(login2()).resolves.toEqual(data);
      expect(POST).toHaveBeenCalledWith(
        "services",
        "MYACCOUNT/login2",
        { login: undefined, password: undefined },
        {},
        { system_id: undefined }
      );
    });
  });
});
