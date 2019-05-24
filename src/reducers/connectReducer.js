const initialState = { loading: false };

const connect = (state = initialState, action) => {
  switch (action.type) {
    case "SETLOADING":
      return {
        ...state,
        loading: action.loading
      };

    default:
      return state;
  }
};

export default connect;
