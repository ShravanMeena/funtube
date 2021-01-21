import { UPDATE_VIDEO } from "./types";

export const updateVideoAction = (data) => {
  return {
    type: UPDATE_VIDEO,
    payload: data,
  };
};
