import { POST } from "./apiServices";

export const getTotalCreditByCurrency = ({ eventId = 1, system_id } = {}) => {
  return POST(
    "TRESO/getTotalCreditByCurrency",
    { event_id: eventId },
    {},
    { system_id }
  );
};
