import { GET } from "./apiResources";

export const fundations = () => {
  return GET("fundations", { ordering: "name" });
};
