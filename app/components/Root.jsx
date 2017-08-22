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
import { joinChatRoom } from '../webRTC/client.jsx';
import RenderGMapImage from './VR/RenderGMapImage';
import { setCurrentPanoId } from '../redux/reducers/panoId';
import { fetchChatrooms } from '../redux/reducers/chatroom';

class Root extends React.Component {
	componentDidMount() {
    this.props.fetchAudio()
    this.props.fetchChatrooms()
	}


	componentWillMount() {
		this.props.setCurrentPanoId([-22.9691146, -43.1805221]);
	}


	render() {
		return (
			<div>
				<Switch>
					{/* <Route exact path='/' render={() => (
						(this.props.auth.id) ? (
							<div>
								<Redirect to="/user" />
							</div>
						) : (
								<Home />
							)
					)}
					/> */}
					<Route exact path='/' component={Future_Home} />
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
					<Route path='/user/chatroom/:name' component={ChatroomPage} />
					<Route path="/aframe" component={RenderGMapImage} />
					<Route path="/:name/location-selection" component={LocationSelection} />
					<Route exact path='/audio' component={Audio} />
				</Switch>
			</div>
		)
	}
}

const mapState = ({ auth }) => ({
	auth
});

const mapDispatch = { setCurrentPanoId, fetchAudio, fetchChatrooms };

export default withRouter(connect(mapState, mapDispatch)(Root))
