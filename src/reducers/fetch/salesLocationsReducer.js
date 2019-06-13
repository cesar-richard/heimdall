import { combineReducers } from "redux";

const initialState = {
  isLoading: [],
  hasErrored: [],
  hasBeenFetched: [],
  data: []
};

export const createSalesLocationsReducer = name => {
  const hasErrored = (state = initialState.hasErrored, action) => {
    switch (action.type) {
      case `SALESLOCATION_HAS_ERRORED`:
        return {
          ...state,
          [action.fundationId]: action.hasErrored
        };
      default:
        return state;
    }
  };

  const isLoading = (state = initialState.isLoading, action) => {
    switch (action.type) {
      case `SALESLOCATION_IS_LOADING`:
        return {
          ...state,
          [action.fundationId]: action.isLoading
        };
      default:
        return state;
    }
  };

  const data = (state = initialState.data, action) => {
    switch (action.type) {
      case `SALESLOCATION_FETCH_DATA_SUCCESS`:
        return {
          ...state,
          [action.fundationId]: action.payload.data
        };
      case `SALESLOCATION_CLEAR`:
        return {};
      default:
        return state;
    }
  };

  const hasBeenFetched = (state = initialState.hasBeenFetched, action) => {
    switch (action.type) {
      case `SALESLOCATION_FETCH_DATA_SUCCESS`:
        return {
          ...state,
          [action.fundationId]: true
        };
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
