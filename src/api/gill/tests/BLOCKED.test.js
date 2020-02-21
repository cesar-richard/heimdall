import { POST } from "../apiClient";
import { getAllBlocked, remove } from "../BLOCKED";
jest.mock("../apiClient");
beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../apiClient");
});

describe("getAllBlocked", () => {
  it("fetches successfully data from API", async () => {
    const data = {};
    POST.mockImplementationOnce(() => Promise.resolve(data));
    await expect(
      getAllBlocked({
        fundationId: 1,
        system_id: 160677,
        event_id: 1
      })
    ).resolves.toEqual(data);
    expect(POST).toHaveBeenCalledWith(
      "services",
      "BLOCKED/getAll",
      { fun_id: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    );
  });
});

describe("remove", () => {
  it("fetches successfully data from API", async () => {
    const data = {};
    POST.mockImplementationOnce(() => Promise.resolve(data));
    await expect(
      remove({ bloId: 1, fundationId: 1, system_id: 160677, event_id: 1 })
    ).resolves.toEqual(data);
    expect(POST).toHaveBeenCalledWith(
      "services",
      "BLOCKED/remove",
      { blo_id: 1, fun_id: 1 },
      {},
      { event_id: 1, system_id: 160677 }
    );
  });
});
