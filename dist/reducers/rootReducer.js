import { combineReducers } from 'redux';
import calendarReducer from './calendarReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
  calendar: calendarReducer,
  schedule: scheduleReducer
});

export const getDates = (state) => {
  return Object.keys(state.schedule.dataSchedule);
};

export const getTables = (state) => {
  const currentDay = state.calendar.currentDate;
  const objTables = state.schedule.dataSchedule[currentDay];
  return objTables === undefined || null ? [] : Object.keys(objTables);
};
