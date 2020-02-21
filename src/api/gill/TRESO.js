import { POST } from "./apiClient";

export const getTotalCreditByCurrency = ({ event_id, system_id } = {}) => {
  return POST(
    "services",
    "TRESO/getTotalCreditByCurrency",
    { event_id },
    {},
    { system_id }
  );
};
