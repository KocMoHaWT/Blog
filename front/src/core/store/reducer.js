import { combineReducers } from 'redux';
import authFlowReducer from './modules/auth';

export default combineReducers({
  auth: authFlowReducer,
});
