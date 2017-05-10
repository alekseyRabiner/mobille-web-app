import { combineReducers } from 'redux';
import moment from 'moment';

export const dataSchedule = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_SCHEDULE_SUCCESS':
      return { ...state,
        ...action.schedule
      };
    default:
      return state;
  }
};

const initialCurrentData = `${moment().format('DD')}-${moment().locale('ru').format('MMM')}`;
export const currentDate = (state = initialCurrentData, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.date;
    default:
      return state;
  }
};


export default combineReducers({
    dataSchedule,
    currentDate
});
