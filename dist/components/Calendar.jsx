import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDates } from '../reducers/rootReducer';
import { setDate } from '../actions';

class Calendar extends React.Component {
  renderCalendar() {
    return this.props.dates.map((date) => {
      const key = `${date[1]}-${date[0]}`;
      return (
        <li
          key={key}
          className={key === this.props.currentDate ? 'calendar-list-item-active' : 'calendar-list-item'}
          onClick={() => this.props.setDate(key)}
          >
          <div className="date-month">{date[0]}</div>
          <div className="date-day">{date[1]}</div>
          <div className="date-week">{date[2]}</div>
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
