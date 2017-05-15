import { combineReducers } from 'redux';

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

export default combineReducers({
    dataSchedule
});
