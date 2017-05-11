import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeColumn from 'TimeColumn';
import Schedule from 'Schedule';
import Tables from 'Tables';
import { loadSchedule } from '../actions';
import { getTables } from '../reducers/rootReducer';
import arrayOfTime from '../../config/ArrayOfTime.json';

const handleScroll = (event) => {
  const timeColumn = document.querySelector('.timecolumn');
  /*  const topbarHeight = getComputedStyle(document.querySelector('.top-bar')).height;
    const calendarHeight = getComputedStyle(document.querySelector('.calendar')).height;
    const offsetTop = parseInt(topbarHeight, 10) + parseInt(calendarHeight, 10);*/
  const x = event.currentTarget.scrollLeft;
  timeColumn.style.left = x + 'px';
};

const fixHeightBody = () => {
  const timecolumnHeight = getComputedStyle(document.querySelector('.timecolumn')).height;
  const body = document.querySelector('#body-container');
  body.style.height = timecolumnHeight;
};

class Body extends React.Component {
  componentWillMount() {
    this.props.loadSchedule();
  }
  componentDidMount() {
    fixHeightBody();
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.currentDate !== nextProps.currentDate ||
      this.props.schedule !== nextProps.schedule ||
      this.props.tables !== nextProps.tables
    ) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div id="body-container" onScroll={event => handleScroll(event)}>
        <TimeColumn arrayOfTime={arrayOfTime} />
        <Tables tables={this.props.tables} />
        {/*<Schedule />*/}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    schedule: state.schedule.dataSchedule,
    currentDate: state.calendar.currentDate,
    tables: getTables(state)
  };
};
const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ loadSchedule }, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(Body);
