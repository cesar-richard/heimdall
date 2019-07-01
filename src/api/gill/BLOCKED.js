import { POST } from "./apiServices";

export const getAllBlocked = fundationId => {
  return POST("BLOCKED/getAll", { fun_id: fundationId });
};

export const remove = (bloId, fundationId) => {
  return POST("BLOCKED/remove", { fun_id: fundationId, blo_id: bloId });
};
