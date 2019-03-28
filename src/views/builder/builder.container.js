import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import BuilderModule from './builder.module'

const mapStateToProps = (state) => {
  return {
    terms: state.terms
  }
};

const mapDispatchToProps = (dispatch) => ({
});

const BuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(BuilderModule);

export default withRouter(BuilderContainer)
