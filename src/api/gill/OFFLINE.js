import { POST } from "./apiServices";

export const getConfig = () => {
  return POST("OFFLINE/getConfig");
};

export const getCounterSchemas = () => {
  return POST("OFFLINE/getCounterSchemas");
};

export const getWalletConfigs = () => {
  return POST("OFFLINE/getWalletConfigs");
};

export const getWifiConfigs = () => {
  return POST("OFFLINE/getWifiConfigs");
};
