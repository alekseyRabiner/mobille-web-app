import React from 'react';

const Tables = () => {
  window.addEventListener('scroll', () => {
    const tableCont = document.querySelector('.table-cont');
    const y = window.pageYOffset;
    const offset = parseInt(getComputedStyle(document.querySelector('.top-bar')).height, 10) + parseInt(getComputedStyle(document.querySelector('.calendar-list')).height, 10)
    if (y >= offset) {
      tableCont.style.top = (y - offset) + 'px';
    }
    if (y <= offset) {
      tableCont.style.top = '0px';
    }
  });

  return (
    <div id="tables" className="table-cont">
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
      <div className="table-item">№2</div>
    </div>);
};
export default Tables;
