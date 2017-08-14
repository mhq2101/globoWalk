import React from 'react'
import { Route, browserHistory, IndexRedirect, Switch } from 'react-router';
import Audio from './Audio'
import Home from './Home'
import {fetchAudio} from '../redux/reducers/audioStream.jsx';
import store from '../store.jsx';
import {joinChatRoom} from '../webRTC/client.jsx'

// import App from './components/App';
// import Home from './components/Login/Home';
// import Login from './components/Login/Login';
// import Signup from './components/Login/Signup';
// import SOCKET from '../socket';
// import { whoami, logout } from '../redux/reducers/auth';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Root extends React.Component {

    componentDidMount() {
      // store.dispatch(fetchAudio())
      joinChatRoom('lobby')
      
    }

    render() {
        return (
            <div>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/audio' component={Audio} />
                    </Switch>
                </div>

            </div>
        )
    }
}
