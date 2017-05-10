import { combineReducers } from 'redux';
import moment from 'moment';
import calendarReducer from './calendarReducer';

export default combineReducers({
  calendar: calendarReducer
});

export const getDates = (state) => {
  const dates = state.calendar.dataSchedule;
  return Object.keys(dates).map((data) => {
    const momentObj = moment(data, 'DD-MM-YYYY').locale('ru');
    return [momentObj.format('MMM'), momentObj.date(), momentObj.format('ddd')];
  });
};

