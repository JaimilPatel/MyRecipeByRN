import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import feedReducer from "../reducers/feedReducer";
import ingredientReducer from "../reducers/ingredientReducer";

export default createStore(
    combineReducers({
        authReducer,
        feedReducer,
        ingredientReducer
    }),
)
