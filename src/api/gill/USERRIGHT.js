import { POST } from "./apiClient";

export const getAllMyRightsEvents = (system_id, sessionid) => {
  return POST(
    "services",
    "USERRIGHT/getAllMyRightsEvents",
    {},
    {},
    { system_id, sessionid }
  );
};
