import { POST } from "./apiClient";

export const getConfig = ({ system_id } = {}) => {
  if (system_id === undefined) throw new Error("missing parameters");
  return POST("services", "OFFLINE/getConfig", {}, {}, { system_id });
};

export const getCounterSchemas = ({ system_id, event_id } = {}) => {
  if (system_id === undefined || event_id === undefined)
    throw new Error("missing parameters");
  return POST(
    "services",
    "OFFLINE/getCounterSchemas",
    {},
    {},
    { system_id, event_id }
  );
};

export const getWalletConfigs = ({ system_id, event_id } = {}) => {
  if (system_id === undefined || event_id === undefined)
    throw new Error("missing parameters");
  return POST(
    "services",
    "OFFLINE/getWalletConfigs",
    {},
    {},
    { system_id, event_id }
  );
};

export const getWifiConfigs = ({ system_id, event_id } = {}) => {
  if (system_id === undefined || event_id === undefined)
    throw new Error("missing parameters");
  return POST(
    "services",
    "OFFLINE/getWifiConfigs",
    {},
    {},
    { system_id, event_id }
  );
};

export const updateOrder = ({
  system_id,
  event_id,
  order,
  status,
  location_id,
  desk_id
} = {}) => {
  if (system_id === undefined || event_id === undefined)
    throw new Error("missing parameters");
  return POST(
    "services",
    "OFFLINE/updateOrder",
    {
      order,
      status,
      location_id,
      desk_id
    },
    {},
    { system_id, event_id }
  );
};
