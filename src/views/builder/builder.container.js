import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import BuilderModule from './builder.module'
import dispatches from '../../common/dispatches';
import { actions } from '../../models/builder/builder.actions';

const mapStateToProps = (state) => {
  return {
    _courses: state.courses,
    _terms: state.terms,
    _builder: state.builder
  }
};

const mapDispatchToProps = (dispatch) => {
  const commonDispatches = dispatches(dispatch);
  return {
    common: {
      getCoursesForTerm: commonDispatches.getCoursesForTerm,
      getCourseScheduleForTerm: commonDispatches.getCourseScheduleForTerm,
      getCourseInformation: commonDispatches.getCourseInformation
    },
    builder: {
      addCourse: (course) => {
        dispatch(actions.addCourse(course));
      }
    }
  }
};

const BuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(BuilderModule);

export default withRouter(BuilderContainer)
