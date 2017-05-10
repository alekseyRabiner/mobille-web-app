import React from 'react';
import arrayOfTime from '../../config/ArrayOfTime.json';

const renderTimeColumn = (dataOfTime) => {
  return dataOfTime.map((time) => {
    return (
      <li className="timecolumn-list-item">
        <div className="timecolumn-hour">{time[0]}</div>
        <div className="timecolumn-minute">{time[1]}</div>
      </li>
    );
  });
};

const TimeColumn = () => {
  return (
    <div className="timecolumn">
      <ul className="timecolumn-list">
        {renderTimeColumn(arrayOfTime)}
      </ul>
    </div>
  );
};

export default TimeColumn;
