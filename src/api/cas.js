import axios from "axios";
import queryString from "query-string";

export const getTicketGrantingTicket = (casUrl, username, password, service) =>
  axios({
    url: casUrl + "/v1/tickets/",
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    data: queryString.stringify({ username, password, service })
  });

export const getServiceTicket = (
  casUrl,
  ticketGrantingTicket,
  username,
  password,
  service
) =>
  axios({
    url: casUrl + "/v1/tickets/" + ticketGrantingTicket,
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Accept: "text/plain"
    },
    data: queryString.stringify({ username, password, service })
  });
