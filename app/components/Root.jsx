import React from 'react';
import { connect } from 'react-redux';
import { Route, browserHistory, Redirect, Switch } from 'react-router';
import Audio from './Audio';
import Home from './Home';
import Login from './Login';
import UserPage from './UserPage';
import {fetchAudio} from '../redux/reducers/audioStream.jsx';
import store from '../store.jsx';
// import {joinChatRoom} from '../webRTC/client.jsx';

// import App from './components/App';
// import Home from './components/Login/Home';
// import Login from './components/Login/Login';
// import Signup from './components/Login/Signup';
// import SOCKET from '../socket';
// import { whoami, logout } from '../redux/reducers/auth';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends React.Component {

    componentDidMount() {
      // store.dispatch(fetchAudio())
      //joinChatRoom('lobby')
      
    }

    render() {
        return (
            <div>
                <div>
                    <Switch>
                        <Route exact path='/' render={() => (
                            (this.props.auth.id) ? (
                            <div>
                                <Redirect to="/user"/>
                                <UserPage />
                            </div>
                            ) : (
                            <Home />
                            )
                            )}
                        />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/audio' component={Audio} />
                    </Switch>
                </div>

            </div>
        )
    }
}

const mapState = ({ auth }) => ({
    auth 
});

const mapDispatch = dispatch => ({
    
});

export default connect(mapState, mapDispatch)(Root)