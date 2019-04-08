import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TimetableModule from './timetable.module';

const mapStateToProps = (state) => {
  
  return {
    _builder: state.builder,
    _terms: state.terms
  };
};

const mapDispatchToProps = (dispatch) => ({});

const TimetableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(TimetableModule);

export default withRouter(TimetableContainer);
