import { POST } from "./apiServices";

export const loginCas2 = (ticket, service) => {
  return POST("MYACCOUNT/loginCas2", { ticket, service });
};

export const login2 = (login, password) => {
  return POST("MYACCOUNT/login2", { login, password });
};
