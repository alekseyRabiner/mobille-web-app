import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callModal } from '../actions';
import arrayOfTime from '../../config/ArrayOfTime.json';
import { getParamElem, parseTime } from '../utils';

const getLongSession = ({ start, end }) => {
  const [hourStart, minuteStart] = parseTime(start);
  const [hourEnd, minuteEnd] = parseTime(end);
  const durationHour = (hourEnd - hourStart) * 60;
  const durationMinute = minuteEnd - minuteStart;
  return durationHour + durationMinute;
};
const getBreakSession = (session, previosSession = { end: '09:00' }) => {
  const [hourCurr, minuteCurr] = parseTime(session.start);
  const [hourPrev, minutePrev] = parseTime(previosSession.end);
  const breakHour = (hourCurr - hourPrev) * 60;
  const breakMinute = minuteCurr - minutePrev;
  return breakHour + breakMinute;
};

const renderColumn = (tableSchedule) => {
  let previosSession;
  return tableSchedule.map((session, i) => {
    const longSession = getLongSession(session);
    const breakSession = getBreakSession(session, previosSession);
    const style = {
      height: ((longSession * 3) - 3) + 'px',
      marginTop: i === 0 ? (breakSession * 3) + 'px' : ((breakSession * 3) + 3) + 'px'
    };
    previosSession = session;
    const darkOrYellow = longSession > 150 ? 'table-session-item-dark' : 'table-session-item-yellow';
    return (
      <div className={`table-session-item ${darkOrYellow}`} style={style} key={`${session.start}:${session.end}`}>
        <div className="schedule-start">{session.start}</div>
        <div className="schedule-end">{session.end}</div>
      </div>
    );
  });
};

const renderRow = (todaySchedule) => {
  if (todaySchedule === undefined || null) {
    return [];
  }
  return Object.keys(todaySchedule).map((keyDateSchedule) => {
    return (
      <div className="column-schedule" key={keyDateSchedule}>
        {renderColumn(todaySchedule[keyDateSchedule])}
      </div>
    );
  });
};
const renderSlicer = (sliceCount) => {
  let sliceItems = [];
  for (let i = 0; i < sliceCount; i++) {
    const sliceItem = (<li className="slice-list-item" key={i} />);
    sliceItems = [...sliceItems, sliceItem];
  }
  return (
    <ul className="slice-list">
      {sliceItems}
    </ul>
  );
};

const getHeightOpacity = (hour, minute) => {
  const durationHour = (hour - 9) * 60;
  const durationMinute = minute - 0;
  return ((durationHour + durationMinute) * 3);
};

const setHeightOpacity = () => {
  const opacityBlock = document.querySelector('.opacity-block');
  const [hour, minute] = [new Date().getHours(), new Date().getMinutes()];
  opacityBlock.style.height = getHeightOpacity(hour, minute) + 'px';
};

const setHeightCircle = () => {
  const circlePos = document.querySelector('li.current-time-circle').style;
  const scrollTopBody = document.querySelector('.body-hidescroll-container').scrollTop;
  const opacityH = getParamElem('.opacity-block', 'height');
  const topBarH = getParamElem('.top-bar', 'height');
  const calendarH = getParamElem('.calendar', 'height');
  const tablesH = (getParamElem('#tables', 'height') || 68) + (15 - 8);
  const offsetY = topBarH + calendarH + tablesH;
  circlePos.top = offsetY + (opacityH - scrollTopBody - 1) + 'px';
};

const intervalSetters = () => {
  setHeightOpacity();
  setHeightCircle();
};

class Schedule extends React.Component {
  componentDidMount() {
    intervalSetters();
    this.intervalId = setInterval(intervalSetters, 1000 * 60);
  }
  componentDidUpdate(prevProps) {
    const { settedDate } = this.props;
    if (prevProps.settedDate !== settedDate) {
      clearInterval(this.intervalId);
      if (document.querySelector('.opacity-block')) {
        intervalSetters();
        this.intervalId = setInterval(intervalSetters, 1000 * 60);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { currentDate, settedDate, schedule } = this.props;
    return (
      <div id="schedule">
        <div className="row-schedule">
          {renderRow(schedule[settedDate])}
        </div>
        <div className="hour-slicer">
          {renderSlicer(arrayOfTime.length)}
        </div>
        {currentDate === settedDate ?
          <div className="opacity-block">
            <ul className="current-time-list" onClick={() => { document.getElementById('overlay').style.height = '100%'; }}>
              <li className="current-time-circle" />
              <li className="current-time-line" />
            </ul>
          </div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule.dataSchedule,
    settedDate: state.calendar.settedDate,
    currentDate: state.calendar.currentDate
  };
};

const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ callModal }, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(Schedule);
