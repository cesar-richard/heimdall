import { POST } from "./apiServices";

export const getAllBlocked = fundationId => {
  return POST("BLOCKED/getAll", { fun_id: fundationId });
};
