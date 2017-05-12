import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getDates } from '../reducers/rootReducer';
import { setDate } from '../actions';

const formatDate = (date) => {
    const momentObj = moment(date, 'DD-MM-YYYY').locale('ru');
    return [momentObj.format('MMM'), momentObj.date(), momentObj.format('ddd')];
  };

class Calendar extends React.Component {
  renderCalendar() {
    return this.props.dates.map((date) => {
      const formatedDate = formatDate(date);
      return (
        <li
          key={date}
          className={date === this.props.currentDate ? 'calendar-list-item-active' : 'calendar-list-item'}
          onClick={() => this.props.setDate(date)}
          >
          <div className="date-month">{formatedDate[0]}</div>
          <div className="date-day">{formatedDate[1]}</div>
          <div className="date-week">{formatedDate[2]}</div>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="calendar">
        <ul className="calendar-list">
          {this.renderCalendar()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dates: getDates(state),
    currentDate: state.calendar.currentDate
  };
};

const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({setDate}, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(Calendar);
