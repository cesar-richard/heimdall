import { POST } from "./apiClient";

export const getAllBlocked = ({ fundationId, system_id, event_id } = {}) => {
  return POST(
    "services",
    "BLOCKED/getAll",
    { fun_id: fundationId },
    {},
    { system_id, event_id: event_id }
  );
};

export const remove = ({ bloId, fundationId, system_id, event_id } = {}) => {
  return POST(
    "services",
    "BLOCKED/remove",
    { fun_id: fundationId, blo_id: bloId },
    {},
    { system_id, event_id: event_id }
  );
};

export const block = ({
  userId,
  fundationId,
  system_id,
  raison,
  walletId,
  dateFin
} = {}) => {
  return POST(
    "services",
    "BLOCKED/block",
    {
      usr_id: userId,
      wallet: walletId,
      raison: raison,
      fun_id: fundationId,
      date_fin: dateFin
    },
    {},
    { system_id }
  );
};
