import React from 'react';
import { Route, browserHistory, IndexRedirect, Switch } from 'react-router';
import { connect } from 'react-redux';
import Audio from './Audio'
import Home from './Home'
import {fetchAudio} from '../redux/reducers/audioStream.jsx';
import store from '../store.jsx';
import {joinChatRoom} from '../webRTC/client.jsx'

import Home from './Home';
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
		this.props.setCurrentPanoId('dXZfBMex9_L7jO2JW3FTdA');
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/aframe" component={RenderGMapImage} />
        <Route exact path='/audio' component={Audio} />
			</Switch>
		);
	}
}

const mapDispatchToProps = { setCurrentPanoId };
  componentDidMount() {
    // store.dispatch(fetchAudio())
    joinChatRoom('lobby')

  }

export default connect(null, mapDispatchToProps)(Root);
