import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeColumn from 'TimeColumn';
import { loadSchedule } from '../actions';

class Body extends React.Component {
  componentWillMount() {
    this.props.loadSchedule();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentDate !== prevProps.currentDate) {
      this.props.loadSchedule();
    }
  }

  render() {
    return (
      <div id="body-container">
        <div><TimeColumn /></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
       schedule: state.calendar.dataSchedule,
       currentDate: state.calendar.currentDate
  };
};
const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({loadSchedule}, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(Body);
