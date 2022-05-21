import { combineReducers } from 'redux'
import user from './user'
import activityIndicator from './activityIndicator'

const rootReducer = combineReducers({
  user,
  activityIndicator
})

export default rootReducer
