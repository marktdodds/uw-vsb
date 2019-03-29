import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import LookupModule from './lookup.module'
import dispatches from '../../common/dispatches.common'

const mapStateToProps = (state) => {
  return {
    terms: state.terms,
    courses: state.courses
  }
};

const mapDispatchToProps = (dispatch) => () => {
  const commonDispatches = dispatches(dispatch);
  return {
    common: {
      getCoursesForTerm: commonDispatches.getCoursesForTerm,
      getCourseScheduleForTerm: commonDispatches.getCourseScheduleForTerm,
      getCourseInformation: commonDispatches.getCourseInformation
    }
  }
};

const LookupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(LookupModule)

export default withRouter(LookupContainer)
