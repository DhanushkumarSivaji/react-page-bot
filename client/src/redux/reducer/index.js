import { combineReducers } from 'redux';
import BotReducer from './botReducer';

export default combineReducers({
  bot: BotReducer
});
