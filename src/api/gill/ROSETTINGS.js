import { POST } from "./apiServices";

export const getCasUrl = () => {
  return POST("ROSETTINGS/getCasUrl");
};
