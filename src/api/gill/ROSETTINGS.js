import { POST } from "./apiClient";

export const getCasUrl = system_id => {
  return POST("services", "ROSETTINGS/getCasUrl", {}, {}, { system_id });
};
