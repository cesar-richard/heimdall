import { POST } from "./apiServices";

export const getAllBlocked = ({ fundationId, system_id, event_id } = {}) => {
  return POST(
    "BLOCKED/getAll",
    { fun_id: fundationId },
    {},
    { system_id, event_id: event_id }
  );
};

export const remove = ({ bloId, fundationId, system_id, event_id } = {}) => {
  return POST(
    "BLOCKED/remove",
    { fun_id: fundationId, blo_id: bloId },
    {},
    { system_id, event_id: event_id }
  );
};
