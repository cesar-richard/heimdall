import { POST } from "./apiServices";
import { getTotalCreditByCurrency } from "./TRESO";
jest.mock("./apiServices");

describe("getTotalCreditByCurrency", () => {
  it("fetches successfully data from API", async () => {
    const data = [
      {
        currency_id: 1,
        currency__name: "EUR",
        currency__group_id: 1,
        currency__group__name: "EUR",
        sum_credit: 5100207
      },
      {
        currency_id: 3,
        currency__name: "Ticket Conso",
        currency__group_id: 3,
        currency__group__name: "Tickets Conso",
        sum_credit: 0
      },
      {
        currency_id: 5,
        currency__name: "INACTIF",
        currency__group_id: 3,
        currency__group__name: "Tickets Conso",
        sum_credit: 0
      },
      {
        currency_id: 4,
        currency__name: "Ecocup Pic",
        currency__group_id: 4,
        currency__group__name: "Ecocups",
        sum_credit: 0
      }
    ];
    POST.mockImplementationOnce(() => Promise.resolve(data));
    await expect(
      getTotalCreditByCurrency({ event_id: 1, system_id: 160677 })
    ).resolves.toEqual(data);
  });
  it("fails if no parameters are given", async () => {
    const data = { error: { type: "Forbidden", code: "403", message: "" } };
    POST.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getTotalCreditByCurrency()).resolves.toEqual(data);
  });
});
