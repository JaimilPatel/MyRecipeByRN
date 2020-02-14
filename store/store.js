import { createStore, combineReducers } from "redux";
import AddCombineDetails from "../reducers/combineDetailsReducer";
import GetCombineFeed from "../reducers/combineFeedReducer";

//To Combine All the Reducers
export default createStore(
    combineReducers({
        AddCombineDetails,
        GetCombineFeed
    }),
)
