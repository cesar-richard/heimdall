import hat from 'hat';

export const generateAuthState = () => {
  return {
    type: 'GENERATE_AUTH_STATE',
    payload: {
      authState: hat()
    }
  }
}

export const clearAuthState = () => {
  return {
    type: 'CLEAR_AUTH_STATE'
  }
}
