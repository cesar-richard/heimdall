import { GET, PUT } from "./apiResources";

export const getFundations = () => {
  return GET("fundations", { ordering: "name" }).then(ret => {
    ret.data.push({ id: 0, name: "System", removed: false });
    return ret;
  });
};

export const getWalletGroups = ({ limit = 500, ordering = "name,id" }) => {
  return GET("walletgroups", { limit, ordering });
};

export const getCurrencies = group => {
  return GET("currencies", { group });
};

export const getSalesLocations = fundationId => {
  return GET("saleslocations", { fundation: fundationId });
};

export const putSalesLocations = (
  fundationId,
  salesLocationId,
  name,
  enabled
) => {
  return PUT("saleslocations/" + salesLocationId, {
    id: salesLocationId,
    fun_id: fundationId,
    enabled,
    name
  });
};

export const getZones = ({ periods, ordering = "name,id" }) => {
  return GET("zones", { periods });
};
