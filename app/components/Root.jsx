import React from 'react';

import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Audio from './Audio';
import Home from './Home';
import Login from './Login';
import UserPage from './UserPage';
import { fetchAudio } from '../redux/reducers/audioStream.jsx';
import store from '../store.jsx';
// import {joinChatRoom} from '../webRTC/client.jsx';
import { joinChatRoom } from '../webRTC/client.jsx';
import RenderGMapImage from './RenderGMapImage';
import { setCurrentPanoId } from '../redux/reducers/panoId';
// import App from './components/App';
// import Home from './components/Login/Home';
// import Login from './components/Login/Login';
// import Signup from './components/Login/Signup';
// import SOCKET from '../socket';
// import { whoami, logout } from '../redux/reducers/auth';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends React.Component {
	componentWillMount() {
		this.props.setCurrentPanoId('bqcCYoJIe5gS-HNnRL2e1g');
		// store.dispatch(fetchAudio())
		joinChatRoom('lobby');
	}
  

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => (
            (this.props.auth.id) ? (
              <div>
                <Redirect to="/user" />
              </div>
            ) : (
                <Home />
              )
          )}
          />
          <Route exact path='/user' component={UserPage} />
          <Route exact path='/login' component={Login} />
          <Route path="/aframe" component={RenderGMapImage} />
          <Route exact path='/audio' component={Audio} />
        </Switch>
      </div>
    )
  }
}

const mapState = ({ auth }) => ({
  auth
});

const mapDispatch = { setCurrentPanoId };

export default withRouter(connect(mapState, mapDispatch)(Root))
