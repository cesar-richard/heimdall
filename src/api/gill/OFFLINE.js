import { POST } from "./apiClient";

export const getConfig = ({ system_id }) => {
  return POST("services", "OFFLINE/getConfig", {}, {}, { system_id });
};

export const getCounterSchemas = ({ system_id, event_id }) => {
  return POST(
    "services",
    "OFFLINE/getCounterSchemas",
    {},
    {},
    { system_id, event_id }
  );
};

export const getWalletConfigs = ({ system_id, event_id }) => {
  return POST(
    "services",
    "OFFLINE/getWalletConfigs",
    {},
    {},
    { system_id, event_id }
  );
};

export const getWifiConfigs = ({ system_id, event_id }) => {
  return POST(
    "services",
    "OFFLINE/getWifiConfigs",
    {},
    {},
    { system_id, event_id }
  );
};
