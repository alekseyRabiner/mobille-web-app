import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getDates } from '../reducers/rootReducer';
import { setDate } from '../actions';
import { hideScroll } from '../utils';

const formatDate = (date) => {
  const momentObj = moment(date, 'DD-MM-YYYY').locale('ru');
  return [momentObj.format('MMM'), momentObj.date(), momentObj.format('ddd')];
};

class Calendar extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.dates !== prevProps.dates) {
       const calendar = document.querySelector('.calendar-list');
      hideScroll(calendar);
    }
  }
  renderCalendar() {
    return this.props.dates.map((date) => {
      const formatedDate = formatDate(date);
      return (
        <div
          key={date}
          className={date === this.props.settedDate ? 'calendar-list-item-active' : 'calendar-list-item'}
          onClick={() => this.props.setDate(date)}
        >
          <div className="date-month">{formatedDate[0]}</div>
          <div className="date-day">{formatedDate[1]}</div>
          <div className="date-week">{formatedDate[2]}</div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="calendar">
        <div className="calendar-container">
          <div className="calendar-list">
            {this.renderCalendar()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dates: getDates(state),
    settedDate: state.calendar.settedDate
  };
};

const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ setDate }, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(Calendar);
