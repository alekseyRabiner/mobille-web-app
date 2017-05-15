import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeColumn from 'TimeColumn';
import Tables from 'Tables';
import Schedule from 'Schedule';
import { loadSchedule } from '../actions';
import { getTables } from '../reducers/rootReducer';
import arrayOfTime from '../../config/ArrayOfTime.json';
import { getParamElem, hideScroll } from '../utils';

const offsetYTimeColumn = (y, offsetY) => {
  const timeColumn = document.querySelector('.timecolumn').style;
  if (y > 0) {
    timeColumn.top = (offsetY - y) + 'px';
  } else {
    timeColumn.top = offsetY + 'px';
  }
};

const offsetXTables = (x) => {
  const tables = document.querySelector('.table-cont').style;
  if (x > 0) {
    tables.left = -x + 'px';
  } else {
    tables.left = '0px';
  }
};
const offsetYCircleTime = (y) => {
  const circle = document.querySelector('.current-time-circle').style;
  const bodyContH = getParamElem('.body-hidescroll-container', 'height');
  const calendarH = getParamElem('.calendar', 'height');
  const tablesH = getParamElem('#tables', 'height');
  const topBarH = getParamElem('.top-bar', 'height');
  const opacityH = getParamElem('.opacity-block', 'height');
  const heightScheduleWindow = bodyContH - calendarH;
  const offsetY = topBarH + calendarH + tablesH;
  if (y >= (opacityH - heightScheduleWindow - 20) && y <= (opacityH + 20)) {
    circle.top = offsetY + (opacityH - y) + 6 + 'px';
  } else {
    circle.top = '-1000px';
  }
};
const handleScroll = () => {
  const x = document.querySelector('.body-hidescroll-container').scrollLeft;
  const y = document.querySelector('.body-hidescroll-container').scrollTop;
  const opacityBlock = document.querySelector('.opacity-block');
  const topBarH = getParamElem('.top-bar', 'height');
  const calendarH = getParamElem('.calendar', 'height');
  const offsetX = getParamElem('.timecolumn', 'width');
  const offsetY = topBarH + calendarH;
  offsetXTables(x, offsetX);
  offsetYTimeColumn(y, offsetY);
  if (opacityBlock) {
    offsetYCircleTime(y);
  }
};

class Body extends React.Component {
  componentWillMount() {
    this.props.loadSchedule();
  }
  componentDidMount() {
    const hidescrollContainer = document.querySelector('.body-hidescroll-container');
    hideScroll(hidescrollContainer);
    hidescrollContainer.addEventListener('scroll', () => { handleScroll(); });
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.settedDate !== nextProps.settedDate ||
      this.props.schedule !== nextProps.schedule ||
      this.props.tables !== nextProps.tables
    ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    document.querySelector('.body-hidescroll-container').removeEventListener('scroll', () => { handleScroll(); });
  }
  render() {
    const { tables } = this.props;
    return (
      <div id="body-container">
        <div className="body-hidescroll-container">
          <div className="hider-block" />
          <TimeColumn arrayOfTime={arrayOfTime} />
          <Tables tables={tables} />
          <Schedule
            offsetYCircleTime={offsetYCircleTime}
          />
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    schedule: state.schedule.dataSchedule,
    settedDate: state.calendar.settedDate,
    currentDate: state.calendar.currentDate,
    tables: getTables(state)
  };
};
const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ loadSchedule }, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(Body);
