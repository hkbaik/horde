import {TOGGLE_SIDER} from '../actions'

// Reducer for collapsed
const collapsed = (state = false, action) => {
  if(action.type === TOGGLE_SIDER) {
    return !state;
  } else {
    return state;
  }
};

export default collapsed;