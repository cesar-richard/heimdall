import { GET } from "./apiResources";

export const fundations = () => {
  return GET("fundations", { ordering: "name" });
};

export const saleslocations = (fundationId) => {
  return GET("saleslocations", {fundation:fundationId});
};
