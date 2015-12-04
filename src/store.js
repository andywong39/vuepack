/* global __DEV__ */
import { createStore, compose } from 'redux'
// import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from './reducers'

let finalCreateStore
let store
if (__DEV__) {
  const { devTools, persistState } = require('redux-devtools')
  finalCreateStore = compose(
    // applyMiddleware(m1, m2, m3 ...),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)
  store = finalCreateStore(rootReducer)
} else {
  // in production if you want middlewares
  // finalCreateStore = applyMiddleware(...middleware)(createStore)
  // store = finalCreateStore(rootReducer)
  store = createStore(rootReducer)
}

function configureStore () {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

export default configureStore()
