import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  email: 'sal@sisyphus.rocks'
}

export const actionTypes = {
  INIT: 'INIT'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return state
    default:  
      return state
  }
}

export function initializeStore (state = initialState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware())
  )
}
