export default (state = null, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        access_token: payload.access_token
      }
    case 'ADD_RESOURCE_UUID':
        return { ...state, payload }
    case 'CLEAR_SESSION':
      return null;
    case 'SELECT_EVENT':
      return { ...state, selectedEvent: payload.event }
    default:
        return state;
    }
}
