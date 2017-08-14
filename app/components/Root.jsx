import React from 'react'
import { Route, browserHistory, IndexRedirect, Switch } from 'react-router';

import Home from './Home';
import AframeTest from './AframeTest';
// import App from './components/App';
// import Home from './components/Login/Home';
// import Login from './components/Login/Login';
// import Signup from './components/Login/Signup';
// import SOCKET from '../socket';
// import { whoami, logout } from '../redux/reducers/auth';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Root extends React.Component {

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/aframe" component={AframeTest} />
			</Switch>
		)
	}
}
