import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom';
import AsyncApp from './containers/AsyncApp';
import configureStore from './configureStore';
import './theme.css';
import './index.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

let store = configureStore(history, {
    windowHeight: window.innerHeight
  });

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
            <Route exact='/' render={() => (<Redirect to='/horde/directory'/>)} />
            <Route path='/horde' component={AsyncApp} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
