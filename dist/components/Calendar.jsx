import React from 'react';
import { connect } from 'redux';
import moment from 'moment';
import initialDates from '../../config/configData.json';

const renderListDate = (dates) => {
  return Object.keys(dates).map((data) => {
    const momentObj = moment(data, 'DD-MM-YYYY').locale('ru');
    return [momentObj.format('MMM'), momentObj.date(), momentObj.format('ddd')];
  })
}
console.log(renderListDate(initialDates))
class Calendar extends React.Component {
  render() {
    return (null)
  }
}
export default Calendar;