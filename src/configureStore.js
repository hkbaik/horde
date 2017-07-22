import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import orcDashboard from './reducers';
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(history, preloadedState) {
  // Build the middleware for intercepting and dispatching navigation actions
  const rtrMiddleware = routerMiddleware(history)
  return createStore(
    orcDashboard,
    preloadedState,
    applyMiddleware(
      rtrMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )
  )
}