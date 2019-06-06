export default (state = { loading: false }, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
};
