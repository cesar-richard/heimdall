import { POST } from "../apiClient";
jest.mock("../apiClient");
import {
  getConfig,
  getCounterSchemas,
  getWalletConfigs,
  getWifiConfigs
} from "../OFFLINE";

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../apiClient");
});

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

describe("OFFLINE", () => {
  testMethod(POST, getConfig, "getConfig", { system_id: 160677 }, {}, [
    "services",
    "OFFLINE/getConfig",
    {},
    {},
    { system_id: 160677 }
  ]);
  testMethod(
    POST,
    getCounterSchemas,
    "getCounterSchemas",
    { system_id: 160677, event_id: 1 },
    {},
    [
      "services",
      "OFFLINE/getCounterSchemas",
      {},
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    getWalletConfigs,
    "getWalletConfigs",
    { system_id: 160677, event_id: 1 },
    {},
    [
      "services",
      "OFFLINE/getWalletConfigs",
      {},
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    getWifiConfigs,
    "getWifiConfigs",
    { system_id: 160677, event_id: 1 },
    {},
    [
      "services",
      "OFFLINE/getWifiConfigs",
      {},
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
});
