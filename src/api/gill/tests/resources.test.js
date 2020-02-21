import { GET } from "../apiClient";
import { getEvents, getFundations } from "../resources";
jest.mock("../apiClient");

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
  describe("getEvents", () => {
    it("fetches successfully data from API", async () => {
      const data = [
        {
          id: 1,
          default: true,
          name: "PayUTC",
          state: "",
          live_start: "2012-08-31T22:00:00Z",
          live_end: "2050-08-31T22:00:00Z",
          main_weezevent: null,
          weezevent_set: [],
          created: "2017-03-13T08:46:52.022331Z",
          removed: null,
          walletconfig: 1,
          walletconfig_created: "2012-06-18T22:55:52.251414Z",
          walletconfig_closed: null,
          send_email_on_tempbarcode_timedout: false,
          account_creation_shorttag_start: null,
          account_creation_barcode_end: null,
          account_creation_mobile_payment_start: null,
          status: { name: "ONGOING", title: "Événement en cours" },
          option_refundable: true,
          close_request: null,
          closed: null,
          accountability_export: false
        }
      ];
      GET.mockImplementationOnce(() => Promise.resolve(data));
      await expect(
        getEvents({
          system_id: 160677
        })
      ).resolves.toEqual(data);
    });
  });
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
