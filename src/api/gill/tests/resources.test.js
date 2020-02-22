import { GET, POST, PUT } from "../apiClient";
import {
  addWalletToWalletgroup,
  getCurrencies,
  getEvents,
  getFundations,
  getPeriods,
  getSalesLocations,
  getWalletGroups,
  getZoneAccesses,
  getZones,
  putSalesLocations
} from "../resources";
jest.mock("../apiClient");
beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../apiClient");
});

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

function testMethod(
  apiMethod,
  method,
  methodName,
  params,
  dataExpected,
  expectedCallParams
) {
  describe(methodName, () => {
    it("fetches successfully data from API", async () => {
      const data = {};
      apiMethod.mockImplementationOnce(() => Promise.resolve(dataExpected));
      await expect(method(params)).resolves.toEqual(dataExpected);
      expect(apiMethod).toHaveBeenCalledWith(...expectedCallParams);
    });
    it("fails if no parameters are given", async () => {
      await expect(method).toThrow("missing parameters");
    });
  });
}

describe("resources API", () => {
  testMethod(
    GET,
    getEvents,
    "getEvents",
    {
      system_id: 160677
    },
    [
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
    ],
    [
      "resources",
      "events",
      { ordering: "-live_start", removed__isnull: true },
      {},
      { system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    getFundations,
    "getFundations",
    {
      system_id: 160677,
      event_id: 1
    },
    { data: [{ id: 1, name: "Pic'asso", removed: false }] },
    [
      "resources",
      "fundations",
      { ordering: "name" },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    getPeriods,
    "getPeriods",
    {
      system_id: 160677,
      event_id: 1
    },
    {},
    ["resources", "periods", { event: 1 }, {}, { system_id: 160677 }]
  );
  testMethod(
    GET,
    getWalletGroups,
    "getWalletGroups",
    {
      system_id: 160677,
      event_id: 1
    },
    {},
    [
      "resources",
      "walletgroups",
      { limit: 500, ordering: "name,id" },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    getCurrencies,
    "getCurrencies",
    {
      system_id: 160677,
      event_id: 1,
      group: 1
    },
    {},
    [
      "resources",
      "currencies",
      { group: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    getSalesLocations,
    "getSalesLocations",
    {
      system_id: 160677,
      event_id: 1,
      fundationId: 1
    },
    {},
    [
      "resources",
      "saleslocations",
      { fundation: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    PUT,
    putSalesLocations,
    "putSalesLocations",
    {
      fundationId: 1,
      salesLocationId: 1,
      name: "name",
      enabled: true,
      system_id: 160677,
      event_id: 1
    },
    {},
    [
      "resources",
      "saleslocations/1",
      { enabled: true, fundation: 1, id: 1, name: "name" },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    addWalletToWalletgroup,
    "addWalletToWalletgroup",
    {
      walletGroupId: 1,
      walletId: 1,
      system_id: 160677,
      event_id: 1
    },
    {},
    [
      "resources",
      "walletgroups/1/members",
      { wallet_id: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    getZoneAccesses,
    "getZoneAccesses",
    {
      wallet: 1,
      period: 1,
      zone: 1,
      limit: 5000,
      system_id: 160677,
      event_id: 1
    },
    {},
    [
      "resources",
      "zoneaccesses",
      { limit: 5000, period: 1, wallet: 1, zone: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    getZones,
    "getZones",
    {
      periods: [1],
      system_id: 160677,
      event_id: 1
    },
    {},
    [
      "resources",
      "zones",
      { periods: [1] },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
});
