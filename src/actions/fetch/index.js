import { createFetchAction } from "./fetchAction";

import { fundations, saleslocations } from "../../api/gill/resources";

export const getFundations = () =>
  createFetchAction("FUNDATION", () => fundations());

export const getSalesLocations = () =>
  createFetchAction("SALESLOCATION", (fundationId) => saleslocations(fundationId));
