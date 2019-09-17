import { GET, PUT } from "./apiResources";

export const getFundations = () => {
  return GET("fundations", { ordering: "name" }).then(ret => {
    ret.data.push({ id: 0, name: "System", removed: false });
    return ret;
  });
};

export const getWalletGroups = () => {
  return GET("walletgroups", { limit: 500 });
};

export const getCurrencies = (group) => {
  return GET("currencies", { group });
};

export const getSalesLocations = fundationId => {
  return GET("saleslocations", { fundation: fundationId });
};

export const putSalesLocations = (fundationId, salesLocationId, name, enabled) => {
  return PUT("saleslocations/" + salesLocationId, {
    id: salesLocationId,
    fun_id: fundationId,
    enabled,
    name
  });
};
