import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Home from './home'
import { actions as coursesActions } from '../../models/courses/courses.actions'

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
  loadCourseSchedule: (classNumber) => {
    dispatch(coursesActions.loadCourseSchedule(classNumber))
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(Home)

export default withRouter(HomeContainer)
