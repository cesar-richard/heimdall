import { POST } from "./apiServices";

export const getAllMyRightsEvents = (system_id, sessionid) => {
  return POST(
    "USERRIGHT/getAllMyRightsEvents",
    {},
    {},
    { system_id, sessionid }
  );
};
