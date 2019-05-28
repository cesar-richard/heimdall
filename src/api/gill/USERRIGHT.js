import { POST } from "./apiServices";

export const getAllMyRightsEvents = () => {
  return POST("USERRIGHT/getAllMyRightsEvents");
};
