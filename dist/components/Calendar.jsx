import React from 'react';
import { connect } from 'redux';
import moment from 'moment';
import initialDates from '../../config/configData.json';

const formateDates = (dates) => {
  return Object.keys(dates).map((data) => {
    const momentObj = moment(data, 'DD-MM-YYYY').locale('ru');
    return [momentObj.format('MMM'), momentObj.date(), momentObj.format('ddd')];
  });
};

class Calendar extends React.Component {
  renderCalendar() {
    const { dates } = this.props;
    return formateDates(initialDates).map((date) => {
      return (
        <li key={date[1]} className="calendar-list-item">
          <div className="date-month">{date[0]}</div>
          <div className="date-day">{date[1]}</div>
          <div className="date-week">{date[2]}</div>
        </li>
      )
    });
  }
  render() {
    return (
      <div className="calendar">
        <ul className="calendar-list">
          {this.renderCalendar()}
        </ul>
      </div>
    )
  }
}
export default Calendar;