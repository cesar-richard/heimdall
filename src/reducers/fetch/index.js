import { createFetchReducer } from "./fetchReducer";
import { createBlockReducer } from "./blockedReducer";
import { createSalesLocationsReducer } from "./salesLocationsReducer";
export default {
  fundations: createFetchReducer("FUNDATION"),
  salesLocations: createSalesLocationsReducer(),
  blocked: createBlockReducer()
};
