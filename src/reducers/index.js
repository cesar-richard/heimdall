import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import fetchReducer from "./fetch";
import connect from "./connectReducer";
import session from "./sessionReducer";

const reducers = combineReducers({
  ...fetchReducer,
  session,
  routing: routerReducer,
  form: formReducer,
  connect
});

export default persistReducer(
  {
    storage,
    key: "root",
    whitelist: ["session"]
  },
  reducers
);
