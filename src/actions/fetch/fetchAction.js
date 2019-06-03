export const createFetchAction = (name, dataSource) => {
  const itemsHasErrored = (bool) => {
    return {
      type: `${name}_HAS_ERRORED`,
      hasErrored: bool
    };
  }

  const itemsIsLoading = (bool) => {
    return {
      type: `${name}_IS_LOADING`,
      isLoading: bool
    };
  }

  const itemsFetchDataSuccess = (data) => {
    return {
      type: `${name}_FETCH_DATA_SUCCESS`,
      payload: {
        data: data
      }
    };
  }

  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    dataSource()
    .then((data) => dispatch(itemsFetchDataSuccess(data)))
    .catch((err) => dispatch(itemsHasErrored(true)))
    .then(() => dispatch(itemsIsLoading(false)));
  };
}
