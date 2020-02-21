import { GET, POST, PUT } from "./apiClient";

export const getFundations = ({ system_id, event_id }) => {
  return GET(
    "resources",
    "fundations",
    { ordering: "name" },
    {},
    { system_id, event_id }
  ).then(ret => {
    ret.data.push({ id: 0, name: "System", removed: false });
    return ret;
  });
};

export const getWalletGroups = ({
  limit = 500,
  ordering = "name,id",
  system_id,
  event_id
}) => {
  return GET(
    "resources",
    "walletgroups",
    { limit, ordering },
    {},
    { system_id, event_id }
  );
};

export const getCurrencies = ({ group, system_id, event_id }) => {
  return GET("resources", "currencies", { group }, {}, { system_id, event_id });
};

export const getSalesLocations = ({ fundationId, system_id, event_id }) => {
  return GET(
    "resources",
    "saleslocations",
    { fundation: fundationId },
    {},
    { system_id, event_id }
  );
};

export const putSalesLocations = ({
  fundationId,
  salesLocationId,
  name,
  enabled,
  system_id,
  event_id
}) => {
  return PUT(
    "resources",
    "saleslocations/" + salesLocationId,
    {
      id: salesLocationId,
      fundation: fundationId,
      enabled,
      name
    },
    {},
    { system_id, event_id }
  );
};

export const getZones = ({
  periods,
  ordering = "name,id",
  system_id,
  event_id
}) => {
  return GET("resources", "zones", { periods }, {}, { system_id, event_id });
};

export const addWalletToWalletgroup = ({
  walletGroupId,
  walletId,
  system_id,
  event_id
}) => {
  return POST(
    "resources",
    `walletgroups/${walletGroupId}/members`,
    {
      wallet_id: walletId
    },
    {},
    { system_id, event_id }
  );
};

export const getZoneAccesses = ({
  wallet,
  period,
  zone,
  limit = 5000,
  system_id,
  event_id
} = {}) => {
  return GET(
    "resources",
    "zoneaccesses",
    { wallet, period, zone, limit },
    {},
    { system_id, event_id }
  );
};

export const getPeriods = ({ event = 1, system_id }) => {
  return GET("resources", "periods", { event }, {}, { system_id });
};

export const getEvents = ({
  system_id,
  order = "-live_start",
  excludeRemoved = true
}) => {
  return GET(
    "resources",
    "events",
    { ordering: order, removed__isnull: excludeRemoved },
    {},
    { system_id }
  );
};
