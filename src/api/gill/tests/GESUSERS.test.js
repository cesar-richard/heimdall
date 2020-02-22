import { POST } from "../apiClient";
import {
  createPairing,
  getBalances,
  transfer,
  walletAutocomplete
} from "../GESUSERS";

jest.mock("../apiClient");
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

describe("GESUSERS", () => {
  testMethod(
    POST,
    createPairing,
    "createPairing",
    { wallet_id: 1, system_id: 160677, event_id: 1 },
    {},
    [
      "services",
      "GESUSERS/createPairing",
      { short_tag: null, uid: null, wallet: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    getBalances,
    "getBalances",
    { wallet_id: 1, system_id: 160677, event_id: 1 },
    {},
    [
      "services",
      "GESUSERS/getBalances",
      { wallet_id: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    transfer,
    "transfer",
    {
      wallet_src: 1,
      wallet_dst: 2,
      amount: 100,
      message: "msg",
      system_id: 160677,
      event_id: 1
    },
    {},
    [
      "services",
      "GESUSERS/transfer",
      { amount: 100, message: "msg", wallet_dst: 2, wallet_src: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    walletAutocomplete,
    "walletAutocomplete",
    { queryString: "qs", system_id: 160677 },
    {},
    [
      "services",
      "GESUSERS/walletAutocomplete",
      {
        queryString: "qs",
        user__merged_into: false,
        weez_removed: false
      },
      {},
      { system_id: 160677 }
    ]
  );
});
