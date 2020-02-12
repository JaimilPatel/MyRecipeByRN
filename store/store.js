import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import feedReducer from "../reducers/feedReducer"

export default createStore(
    combineReducers({
        authReducer,
        feedReducer
    }),
)
