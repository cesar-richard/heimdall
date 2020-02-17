import { POST } from "./apiServices";
import { getAllBlocked, remove } from "./BLOCKED";
jest.mock("./apiServices");

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
  });
});

describe("remove", () => {
  it("fetches successfully data from API", async () => {
    const data = {};
    POST.mockImplementationOnce(() => Promise.resolve(data));
    await expect(
      remove({ bloId: 1, fundationId: 1, system_id: 160677, event_id: 1 })
    ).resolves.toEqual(data);
  });
});
