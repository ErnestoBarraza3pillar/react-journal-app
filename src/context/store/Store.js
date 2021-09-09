import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/AuthReducer'
import { notesReducer } from '../reducers/NotesReducer'
import { uiReducer } from '../reducers/UiReducer'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const redurcers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer
})

export const store = createStore(
  redurcers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
