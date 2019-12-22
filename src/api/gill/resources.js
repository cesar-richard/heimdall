import { GET, POST, PUT } from "./apiResources";

export const getFundations = ({ system_id }) => {
  return GET("fundations", { ordering: "name" }, {}, { system_id }).then(
    ret => {
      ret.data.push({ id: 0, name: "System", removed: false });
      return ret;
    }
  );
};

export const getWalletGroups = ({
  limit = 500,
  ordering = "name,id",
  system_id
}) => {
  return GET("walletgroups", { limit, ordering }, {}, { system_id });
};

export const getCurrencies = ({ group, system_id }) => {
  return GET("currencies", { group }, {}, { system_id });
};

export const getSalesLocations = ({ fundationId, system_id }) => {
  return GET("saleslocations", { fundation: fundationId }, {}, { system_id });
};

export const putSalesLocations = ({
  fundationId,
  salesLocationId,
  name,
  enabled,
  system_id
}) => {
  return PUT(
    "saleslocations/" + salesLocationId,
    {
      id: salesLocationId,
      fundation: fundationId,
      enabled,
      name
    },
    {},
    { system_id }
  );
};

export const getZones = ({ periods, ordering = "name,id", system_id }) => {
  return GET("zones", { periods }, {}, { system_id });
};

export const addWalletToWalletgroup = ({ walletGroupId, walletId }) => {
  return POST(`walletgroups/${walletGroupId}/members`, {
    wallet_id: walletId
  });
};

export const getZoneAccesses = ({
  wallet,
  period,
  zone,
  limit = 5000,
  system_id
} = {}) => {
  return GET(
    "zoneaccesses",
    { wallet, period, zone, limit },
    {},
    { system_id }
  );
};

export const getPeriods = ({ event = 1, system_id }) => {
  return GET("periods", { event }, {}, { system_id });
};
