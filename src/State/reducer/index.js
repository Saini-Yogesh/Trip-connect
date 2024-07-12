import { combineReducers } from "redux";
import showingContatInfoReducer from "./showingContatInfoReducer";

const reducers = combineReducers({
  showingContactinfo: showingContatInfoReducer,
});

export default reducers;
