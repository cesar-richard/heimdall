import { getAllBlocked as getAllBlockedApi } from "../../api/gill/BLOCKED";
export const getAllBlocked = fundationId => {
  const itemsHasErrored = (fundationId, bool) => {
    return {
      type: `BLOCKED_HAS_ERRORED`,
      hasErrored: bool,
      fundationId: fundationId
    };
  };

  const itemsIsLoading = (fundationId, bool) => {
    return {
      type: `BLOCKED_IS_LOADING`,
      isLoading: bool,
      fundationId: fundationId
    };
  };

  const itemsFetchDataSuccess = (fundationId, data) => {
    return {
      type: `BLOCKED_FETCH_DATA_SUCCESS`,
      payload: {
        data
      },
      fundationId: fundationId
    };
  };

  return dispatch => {
    dispatch(itemsIsLoading(fundationId, true));
    getAllBlockedApi(fundationId === 0 ? null : fundationId)
      .then(data =>
        dispatch(
          itemsFetchDataSuccess(fundationId, data)
        )
      )
      .catch(err =>
        dispatch(itemsHasErrored(fundationId, err))
      )
      .then(() =>
        dispatch(itemsIsLoading(fundationId, false))
      );
  };
};
