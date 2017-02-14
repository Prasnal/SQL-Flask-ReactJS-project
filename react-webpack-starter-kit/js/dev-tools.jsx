import {createStore as ReduxCreateStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
// USE react-router-redux

let createStoreNoDevTools = function (reducer) {
  const store = ReduxCreateStore(reducer,
                                 compose(
                                   applyMiddleware(thunkMiddleware)))
  return store;
}

export var createStore

if(__DEV__ && window.devToolsExtension) {
  createStore = function (reducer) {
    const store = ReduxCreateStore(reducer,
                                   compose(
                                     applyMiddleware(thunkMiddleware),
                                     window.devToolsExtension()))
    return store
  }} else {
    createStore = createStoreNoDevTools
  }
