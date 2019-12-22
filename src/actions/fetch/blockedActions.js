import {
  getAllBlocked as getAllBlockedApi,
  remove as unblockApi
} from "../../api/gill/BLOCKED";
import BlockedModel from "../../models/BlockedModel";
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
      payload: Object.values(data.data).map(item => new BlockedModel(item)),
      fundationId: fundationId
    };
  };

  return dispatch => {
    dispatch(itemsIsLoading(fundationId, true));
    getAllBlockedApi(0 === fundationId ? null : fundationId)
      .then(data => dispatch(itemsFetchDataSuccess(fundationId, data)))
      .catch(err => dispatch(itemsHasErrored(fundationId, err)))
      .then(() => dispatch(itemsIsLoading(fundationId, false)));
  };
};

export const unblock = (bloId, fundationId) => {
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
      payload: Object.values(data.data).map(item => new BlockedModel(item)),
      fundationId: fundationId
    };
  };

  return dispatch => {
    fundationId= 0 === fundationId ? null : fundationId;
    unblockApi(bloId, fundationId).then(
      dispatch(getAllBlocked(fundationId))
    );
  };
};
