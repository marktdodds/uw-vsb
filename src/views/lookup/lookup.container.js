import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import LookupModule from './lookup.module'

const mapStateToProps = (state) => {
  return {
    terms: state.terms,
  }
};

const mapDispatchToProps = (dispatch) => () => {
  // const commonDispatches = dispatches(dispatch);
  return {
  }
};

const LookupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(LookupModule)

export default withRouter(LookupContainer)
