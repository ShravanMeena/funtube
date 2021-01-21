import { combineReducers } from "redux";
import user from "./user_reducer";
import update_videos_reducer from "./update_videos_reducer";

const rootReducer = combineReducers({
  user,
  update_videos_reducer,
});

export default rootReducer;
