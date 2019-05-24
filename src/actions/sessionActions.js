export const createSession = data => {
  return {
    type: "CREATE_SESSION",
    payload: data
  };
};

export const clearSession = () => {
  return {
    type: "CLEAR_SESSION"
  };
};
