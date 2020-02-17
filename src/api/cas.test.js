import axios from "axios";
import { getServiceTicket, getTicketGrantingTicket } from "./cas";
jest.mock("axios");
describe("getTicketGrantingTicket", () => {
  it("fetches successfully data from API", async () => {
    const data =
      "TGT-1519330-KQXVMcRqOYmgw3fGmqRHykx6B-BbHaL7V-23mouKEmAkZQlUeNVXmpZ1-y078knJgzocas";
    axios.mockImplementationOnce(() => Promise.resolve(data));
    await expect(
      getTicketGrantingTicket("casUrl", "username", "password", "service")
    ).resolves.toEqual(data);
  });
  /*it("fetches erroneously data from API", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getTicketGrantingTicket("react")).rejects.toThrow(
      errorMessage
    );
    expect(axios.get).toHaveBeenCalledWith(`${API}/search?query=react`);
  });*/
});

describe("getServiceTicket", () => {
  it("fetches successfully data from API", async () => {
    const data = "ST-2829788-XG9CyaajRMvvwI69yf4xvEQXO1kcas";
    axios.mockImplementationOnce(() => Promise.resolve(data));
    await expect(
      getServiceTicket(
        "casUrl",
        "ticketGrantingTicket",
        "username",
        "password",
        "service"
      )
    ).resolves.toEqual(data);
  });
  /*it("fetches erroneously data from API", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getTicketGrantingTicket("react")).rejects.toThrow(
      errorMessage
    );
    expect(axios.get).toHaveBeenCalledWith(`${API}/search?query=react`);
  });*/
});
