import heimdalConfig from "../config";

export default (state = { loading: false }, action) => {
  const { payload } = action;

  switch (action.type) {
    case "CREATE_SESSION":
      return {
        ...state,
        system_id: heimdalConfig.SYSTEM_ID,
        access_token: payload.access_token,
        gillPermissions: payload.gillPermissions
      };
    case "CLEAR_SESSION":
      return null;
    default:
      return state;
  }
};
