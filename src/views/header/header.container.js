import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import HeaderModule from './header.module'

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => ({
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: true},
)(HeaderModule)

export default withRouter(HeaderContainer)
