import { combineReducers } from 'redux';
import collapsed from './collapsed';
import windowHeight from './windowHeight';
import { routerReducer } from 'react-router-redux';

const orcDashboard = combineReducers({
    collapsed,
    windowHeight,
    router: routerReducer
});

export default orcDashboard;