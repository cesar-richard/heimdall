import { POST } from "./apiClient";

export const getCasUrl = system_id => {
  if (system_id === undefined) throw new Error("missing parameters");
  return POST("services", "ROSETTINGS/getCasUrl", {}, {}, { system_id });
};
