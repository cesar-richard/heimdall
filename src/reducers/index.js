import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import fetchReducers from "./fetch";
import auth from "./authReducer";
import connect from "./connectReducer";
import session from "./sessionReducer";

const reducers = combineReducers({
  ...fetchReducers,
  auth,
  session,
  routing: routerReducer,
  form: formReducer,
  connect
});

export default persistReducer(
  {
    storage,
    key: "root",
    whitelist: ["auth", "session"]
  },
  reducers
);
