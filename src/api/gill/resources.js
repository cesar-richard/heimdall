import { GET } from "./apiResources";

export const fundations = () => {
  return GET("fundations", { ordering: "name" }).then(ret => {
    ret.data.push({ id: 0, name: "System", removed: false });
    return ret;
  });
};

export const saleslocations = fundationId => {
  return GET("saleslocations", { fundation: fundationId });
};
