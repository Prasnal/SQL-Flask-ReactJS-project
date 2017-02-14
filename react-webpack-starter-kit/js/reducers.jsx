// Map Redux state to component props
import {combineReducers} from 'redux'

// Reducer
const initialState = {sample: null}

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'sample':
      return Object.assign({}, state, {sample: action.data})
    default:
      return state
  }
}

function errorsReducer(state = {errors: []}, action) {
  switch (action.type) {
    case 'error':
      return Object.assign({}, state, {errors: state.errors.concat(action.data)})
    default:
      return state
  }
}

export const theReducer = combineReducers({main: mainReducer,
                                           errors: errorsReducer})

export function mapStateToProps(state) {
  return {
    sample: state.main.sample,
    errors: state.errors.errors,
  }
}
