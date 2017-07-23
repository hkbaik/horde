import { combineReducers } from 'redux';
import collapsed from './collapsed';
import windowHeight from './windowHeight';
import directory from './directory';
import { routerReducer } from 'react-router-redux';

const orcDashboard = combineReducers({
    directory,
    collapsed,
    windowHeight,
    router: routerReducer
});

export default orcDashboard;