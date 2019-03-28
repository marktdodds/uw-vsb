import { connect } from 'react-redux'
import RouterModule from './router.module'
import dispatches from '../common/dispatches.common'

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => () => {
  const commonDispatches = dispatches(dispatch);
  return {
    getTerms: commonDispatches.getTerms
  }
};

const RouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(RouterModule);

export default RouterContainer
