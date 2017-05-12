import React from 'react';

const renderTablesList = (tablesArr) => {
  return tablesArr.map((table) => {
    return (
      <div key={table} className="table-item">{table}</div>
    );
  });
};

const Tables = ({ tables }) => {
  return (
    <div id="tables" className="table-cont">
      {renderTablesList(tables)}
    </div>);
};
export default Tables;
