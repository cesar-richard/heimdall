import { POST } from "./apiServices";

export const loginCas2 = (system_id, ticket, service) => {
  return POST("MYACCOUNT/loginCas2", { ticket, service }, {}, { system_id });
};

export const login2 = (system_id, login, password) => {
  return POST("MYACCOUNT/login2", { login, password }, {}, { system_id });
};
