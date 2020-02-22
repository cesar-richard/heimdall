import { POST } from "./apiClient";

export const getAllMyRightsEvents = (system_id, sessionid) => {
  if (system_id === undefined || sessionid === undefined)
    throw new Error("missing parameters");
  return POST(
    "services",
    "USERRIGHT/getAllMyRightsEvents",
    {},
    {},
    { system_id, sessionid }
  );
};
