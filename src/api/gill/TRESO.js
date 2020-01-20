import { POST } from "./apiServices";

export const getTotalCreditByCurrency = ({ event_id, system_id } = {}) => {
  return POST(
    "TRESO/getTotalCreditByCurrency",
    { event_id },
    {},
    { system_id }
  );
};
