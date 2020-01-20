import { POST } from "./apiServices";

export const getConfig = ({ system_id }) => {
  return POST("OFFLINE/getConfig", {}, {}, { system_id });
};

export const getCounterSchemas = ({ system_id, event_id }) => {
  return POST("OFFLINE/getCounterSchemas", {}, {}, { system_id, event_id });
};

export const getWalletConfigs = ({ system_id, event_id }) => {
  return POST("OFFLINE/getWalletConfigs", {}, {}, { system_id, event_id });
};

export const getWifiConfigs = ({ system_id, event_id }) => {
  return POST("OFFLINE/getWifiConfigs", {}, {}, { system_id, event_id });
};
