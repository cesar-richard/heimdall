import { POST } from "./api";

export const getCasUrl = () => {
  return POST(
    "ROSETTINGS/getCasUrl"
  );
};
