import React from 'react';

import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Audio from './Audio';
import Home from './Home';
import Future_Home from './Future_Home';
import LocationSelection from './LocationSelection';
import Login from './Login';
import UserPage from './UserPage';
import ChatroomPage from './ChatroomPage.jsx';
import Signup from './Signup.jsx';
import { fetchAudio } from '../redux/reducers/audioStream.jsx';
import store from '../store.jsx';
// import {joinChatRoom} from '../webRTC/client.jsx';npm 
import { joinChatRoom } from '../webRTC/client.jsx';
import GMapImage from './VR/GMapImage';
import { setCurrentPanoId } from '../redux/reducers/panoId';
// import App from './components/App';
// import Home from './components/Login/Home';
// import Login from './components/Login/Login';
// import Signup from './components/Login/Signup';
// import SOCKET from '../socket';
// import { whoami, logout } from '../redux/reducers/auth';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends React.Component {
	componentDidMount() {
		store.dispatch(fetchAudio())
		//joinChatRoom('lobby')

	}

	componentWillMount() {
		this.props.setCurrentPanoId([-22.9691146, -43.1805221]);
		// store.dispatch(fetchAudio())
		// joinChatRoom('lobby');
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
					<Route exact path='/login' render={() => (
						(this.props.auth.id) ? (
							<div>
								<Redirect to="/user" />
							</div>
						) : (
								<Login />
							)
					)} />
					<Route exact path='/signup' render={() => (
						(this.props.auth.id) ? (
							<div>
								<Redirect to="/user" />
							</div>
						) : (
								<Signup />
							)
					)} />
					<Route path='/chatroom/:id' component={ChatroomPage} />
					<Route path="/aframe" component={GMapImage} />
					<Route path="/location-selection" component={LocationSelection} />
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
