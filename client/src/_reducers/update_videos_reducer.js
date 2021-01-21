import { UPDATE_VIDEO } from "../_actions/types";

const initialState = {};

const updateVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIDEO:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default updateVideoReducer;
