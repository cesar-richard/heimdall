import { getSalesLocations as getSalesLocationsApi } from "../../api/gill/resources";
import SalesLocationModel from "../../models/SalesLocationModel";
export const getSalesLocations = fundationId => {
  const itemsHasErrored = (fundationId, bool) => {
    return {
      type: `SALESLOCATION_HAS_ERRORED`,
      hasErrored: bool,
      fundationId: fundationId
    };
  };

  const itemsIsLoading = (fundationId, bool) => {
    return {
      type: `SALESLOCATION_IS_LOADING`,
      isLoading: bool,
      fundationId: fundationId
    };
  };

  const itemsFetchDataSuccess = (fundationId, data) => {
    return {
      type: `SALESLOCATION_FETCH_DATA_SUCCESS`,
      payload: Object.values(data.data).map(item=>new SalesLocationModel(item)),
      fundationId: fundationId
    };
  };

  return dispatch => {
    if (fundationId === 0) {
      dispatch(itemsIsLoading(fundationId, false));
      dispatch(itemsFetchDataSuccess(fundationId, { data: {} }));
    } else {
      dispatch(itemsIsLoading(fundationId, true));
      getSalesLocationsApi(fundationId)
        .then(data => dispatch(itemsFetchDataSuccess(fundationId, data)))
        .catch(err => dispatch(itemsHasErrored(fundationId, err)))
        .then(() => dispatch(itemsIsLoading(fundationId, false)));
    }
  };
};
