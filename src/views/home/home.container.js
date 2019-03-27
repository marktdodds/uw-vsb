import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Home from './home'
import { actions as coursesActions } from '../../models/courses/courses.actions'

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
  lookupCourse: () => {
    dispatch(coursesActions.lookupCourse('1191', 'CS', '245'));
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(Home)

export default withRouter(HomeContainer)
