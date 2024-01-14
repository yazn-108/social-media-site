import { combineReducers, legacy_createStore } from "redux";
import PostsData from "./PostsData";
import CommentsData from "./CommentsData";
import LogInState from "./LogInState";
import UserId from "./UserId";
const reducers = combineReducers({
    PostsData: PostsData,
    CommentsData: CommentsData,
    LogInState: LogInState,
    UserId: UserId,
})
const store = legacy_createStore(reducers);
export default store;