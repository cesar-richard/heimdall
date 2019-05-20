export default (state = {
  authState: null
}, action) => {
  const { payload } = action;

  switch (action.type) {
      case 'GENERATE_AUTH_STATE':
          return {...state, authState: payload.authState}
      case 'CLEAR_AUTH_STATE':
          return {...state, authState: null}
      default:
          return state;
  }
}