import { POST } from "./apiServices";

export const getAllMyRightsEvents = sessionid => {
  return POST("USERRIGHT/getAllMyRightsEvents", {}, {}, { sessionid });
};
