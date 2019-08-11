import { createFetchAction } from "./fetchAction";

import { getFundations as getFundationsApi, getSalesLocations as getSalesLocationsApi } from "../../api/gill/resources";

export const getFundations = () =>
  createFetchAction("FUNDATION", () => getFundationsApi());

export const getSalesLocations = (fundationId) =>
  createFetchAction("SALESLOCATION", (fundationId) => getSalesLocationsApi(fundationId));
