import { GET, POST } from "../apiClient";
import { batchAccess, batchRefill, search } from "../wallets";

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

describe("wallets", () => {
  testMethod(
    POST,
    batchAccess,
    "batchAccess",
    {
      walletIds: [1],
      quantity: 1,
      zones: [1],
      system_id: 160677
    },
    {},
    [
      "resources",
      "wallets/batch_access?id__in=1",
      {
        action_set: [
          { kind: "set", period_set: [4], quantity: 1, zone_set: [1] }
        ]
      },
      {},
      { system_id: 160677 }
    ]
  );
  testMethod(
    POST,
    batchRefill,
    "batchRefill",
    {
      walletIds: [1],
      quantity: 1,
      currency: 1,
      system_id: 160677
    },
    {},
    [
      "resources",
      "wallets/batch_refill?id__in=1",
      {
        action_set: [
          { currency: 1, kind: "set", quantity: 1, refill_kind: "Heimdall" }
        ]
      },
      {},
      { system_id: 160677 }
    ]
  );
  testMethod(
    GET,
    search,
    "search",
    {
      event_id: 1,
      system_id: 160677,
      queryString: "qs"
    },
    {},
    [
      "resources",
      "wallets",
      {
        event: 1,
        limit: 25,
        offset: 0,
        ordering: "id",
        search: "qs",
        user__merged_into: false,
        weez_removed: false
      },
      {},
      { system_id: 160677 }
    ]
  );
});
