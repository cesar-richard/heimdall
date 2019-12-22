import { POST } from "./apiServices";

export const getCasUrl = system_id => {
  return POST("ROSETTINGS/getCasUrl", {}, {}, { system_id });
};
