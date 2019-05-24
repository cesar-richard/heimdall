import { POST } from "./api";

export const getAllMyRightsEvents = () => {
  return POST("USERRIGHT/getAllMyRightsEvents");
};
