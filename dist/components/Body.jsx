import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeColumn from 'TimeColumn';
import Tables from 'Tables';
import Schedule from 'Schedule';
import { loadSchedule } from '../actions';
import { getTables } from '../reducers/rootReducer';
import arrayOfTime from '../../config/ArrayOfTime.json';

const offsetYTimeColumn = (y, offsetY) => {
  const timeColumn = document.querySelector('.timecolumn').style;
  if (y > 0) {
     timeColumn.top = (offsetY - y) + 'px';
  } else {
     timeColumn.top = offsetY + 'px';
  }
};

const offsetXTables = (x, offsetX) => {
  const tables = document.querySelector('.table-cont').style;
  if (x > 0) {
    tables.left = (offsetX - x) + 'px';
  } else {
    tables.left = offsetX + 'px';
  }
};

const handleScroll = () => {
  const x = document.querySelector('#body-container').scrollLeft;
  const y = document.querySelector('#body-container').scrollTop;
  const topBarH = parseInt(getComputedStyle(document.querySelector('.top-bar')).height, 10);
  const calendarH = parseInt(getComputedStyle(document.querySelector('.calendar')).height, 10);
  const offsetX = parseInt(getComputedStyle(document.querySelector('.timecolumn')).width, 10);
  const offsetY = topBarH + calendarH;
  offsetXTables(x, offsetX);
  offsetYTimeColumn(y, offsetY);
};

class Body extends React.Component {
  componentWillMount() {
    this.props.loadSchedule();
  }
  componentDidMount() {
    document.querySelector('#body-container').addEventListener('scroll', () => { handleScroll(); });
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
  componentWillUnmount() {
    document.querySelector('#body-container').removeEventListener('scroll', () => { handleScroll(); });
  }
  render() {
    return (
      <div id="body-container">
        <TimeColumn arrayOfTime={arrayOfTime} />
        <Tables tables={this.props.tables} />
        <Schedule />
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
