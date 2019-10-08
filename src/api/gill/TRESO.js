import { POST } from "./apiServices";

export const getTotalCreditByCurrency = ({ eventId = 1 } = {}) => {
  return POST("TRESO/getTotalCreditByCurrency", { event_id: eventId }, {}, {});
};
