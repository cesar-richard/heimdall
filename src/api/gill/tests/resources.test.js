import { GET } from "../apiResources";
import { getFundations } from "../resources";
jest.mock("../apiResources");

const errorReal = {
  config: {
    baseURL: "https://api.nemopay.net",
    data: undefined,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Nemopay-Version": "2019-06-26"
    },
    maxContentLength: -1,
    method: "get",
    params: {
      app_key: "0a93e8e18e6ed78fa50c4d74e949801b",
      event_id: 1,
      ordering: "name",
      system_id: 160677
    },
    timeout: 0,
    url: "/resources/fundations",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
  },
  message: "Gill said : undefined",
  status: 401
};

describe("resources API", () => {
  describe("getFundations", () => {
    it("fetches successfully data from API", async () => {
      const data = { data: [{ id: 1, name: "Pic'asso", removed: false }] };
      GET.mockImplementationOnce(() => Promise.resolve(data));
      await expect(
        getFundations({
          system_id: 160677,
          event_id: 1
        })
      ).resolves.toEqual(data);
    });
  });
});
