import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Home from './home'
import { actions as navActions} from "../../models/navigation/navigation.actions";

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
  test: () => {
    dispatch(navActions.dummyReq());
  }
});

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: true},
)(Home)

export default withRouter(HomeContainer)
