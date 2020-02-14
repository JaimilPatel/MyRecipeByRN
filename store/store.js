import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import feedReducer from "../reducers/feedReducer";
import AddCombineDetails from "../reducers/combineDetailsReducer";
import GetCombineFeed from "../reducers/combineFeedReducer";

export default createStore(
    combineReducers({
        authReducer,
        feedReducer,
        AddCombineDetails,
        GetCombineFeed
    }),
)
