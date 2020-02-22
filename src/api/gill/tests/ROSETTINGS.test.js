import { POST } from "../apiClient";
jest.mock("../apiClient");
import { getCasUrl } from "../ROSETTINGS";
beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../apiClient");
});

describe("ROSETTINGS", () => {
  describe("getCasUrl", () => {
    it("fetches successfully data from API", async () => {
      const data = [];
      POST.mockImplementationOnce(() => Promise.resolve(data));
      await expect(getCasUrl(160677)).resolves.toEqual(data);
      expect(POST).toHaveBeenCalledWith(
        "services",
        "ROSETTINGS/getCasUrl",
        {},
        {},
        { system_id: 160677 }
      );
    });
    it("fails if no parameters are given", async () => {
      await expect(getCasUrl).toThrow("missing parameters");
    });
  });
});
