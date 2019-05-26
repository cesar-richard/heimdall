import { POST } from "./api";

export const loginCas2 = (ticket, service) => {
  return POST("MYACCOUNT/loginCas2", { ticket, service });
};
