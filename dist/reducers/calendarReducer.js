import { combineReducers } from 'redux';
import moment from 'moment';

const initialCurrentData = `${moment().format('DD')}-${moment().format('MM')}-${moment().format('YYYY')}`;
export const settedDate = (state = initialCurrentData, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.date;
    default:
      return state;
  }
};
export const currentDate = (state = initialCurrentData) => {
      return state;
};
export default combineReducers({
    settedDate,
    currentDate
});
