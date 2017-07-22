import {UPDATE_WINDOW_HEIGHT} from '../actions'

// Reducer for collapsed
const collapsed = (state = window.innerHeight, action) => {
  if(action.type === UPDATE_WINDOW_HEIGHT) {
    return action.windowHeight;
  } else {
    return state;
  }
};

export default collapsed;