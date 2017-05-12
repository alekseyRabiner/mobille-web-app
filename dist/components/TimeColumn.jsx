import React from 'react';

const renderTimeColumn = (dataOfTime) => {
  return dataOfTime.map((time) => {
    const key = `${time[0]}-${time[1]}`;
    return (
      <li key={key} className="timecolumn-list-item">
        <div className="timecolumn-hour">{time[0]}</div>
        <div className="timecolumn-minute">{time[1]}</div>
      </li>
    );
  });
};

const TimeColumn = ({arrayOfTime}) => {
  return (
    <div className="timecolumn">
      <ul className="timecolumn-list">
        {renderTimeColumn(arrayOfTime)}
      </ul>
    </div>
  );
};

export default TimeColumn;
