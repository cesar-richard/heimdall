import { combineReducers } from "redux";

export const createFetchReducer = name => {
  const hasErrored = (state = false, action) => {
    switch (action.type) {
      case `${name}_HAS_ERRORED`:
        return action.hasErrored;
      case `${name}_IS_LOADING`:
        return action.isLoading ? false : state;
      default:
        return state;
    }
  };

  const isLoading = (state = false, action) => {
    switch (action.type) {
      case `${name}_IS_LOADING`:
        return action.isLoading;
      default:
        return state;
    }
  };

  const data = (state = {}, action) => {
    switch (action.type) {
      case `${name}_FETCH_DATA_SUCCESS`:
        return action.payload;
      case `${name}_IS_LOADING`:
        return action.isLoading ? {} : state;
      case `${name}_CLEAR`:
        return {};
      default:
        return state;
    }
  };

  const hasBeenFetched = (state = false, action) => {
    switch (action.type) {
      case `${name}_FETCH_DATA_SUCCESS`:
        return true;
      case `${name}_IS_LOADING`:
        return action.isLoading ? false : state;
      default:
        return state;
    }
  };

  return combineReducers({
    data,
    hasErrored,
    hasBeenFetched,
    isLoading
  });
};
