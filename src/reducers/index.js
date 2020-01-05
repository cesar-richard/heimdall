import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import connect from "./connectReducer";

const reducers = combineReducers({
  connect,
  routing: routerReducer,
  form: formReducer
});

export default persistReducer(
  {
    storage,
    key: "root",
    whitelist: ["session"]
  },
  reducers
);
