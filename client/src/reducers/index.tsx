import { combineReducers } from "redux";
import songs from "./songs";

export * from "./songs";
export default combineReducers({ songs });
