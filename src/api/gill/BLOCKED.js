import { POST } from "./apiServices";

export const getAll = fundationId => {
  return POST("BLOCKED/getAll", { fun_id: fundationId });
};
