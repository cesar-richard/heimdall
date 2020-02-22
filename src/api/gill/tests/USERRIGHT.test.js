import { POST } from "../apiClient";
import { getAllMyRightsEvents } from "../USERRIGHT";
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
      await expect(method(...params)).resolves.toEqual(dataExpected);
      expect(apiMethod).toHaveBeenCalledWith(...expectedCallParams);
    });
    it("fails if no parameters are given", async () => {
      await expect(method).toThrow("missing parameters");
    });
  });
}

describe("USERRIGHTS", () => {
  testMethod(
    POST,
    getAllMyRightsEvents,
    "getAllMyRightsEvents",
    [160677, "sessionId"],
    {},
    [
      "services",
      "USERRIGHT/getAllMyRightsEvents",
      {},
      {},
      { sessionid: "sessionId", system_id: 160677 }
    ]
  );
});
