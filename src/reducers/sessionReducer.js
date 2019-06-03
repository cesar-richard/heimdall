export default (state = null, action) => {
  const { payload } = action;

  switch (action.type) {
    case "CREATE_SESSION":
      return {
        ...state,
        access_token: payload.access_token,
        gillPermissions: payload.gillPermissions
      };
    case "CLEAR_SESSION":
      return null;
    default:
      return state;
  }
};
