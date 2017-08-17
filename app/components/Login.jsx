import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { login, logout } from '../redux/reducers/auth';


/* -------Component--------- */

class Login extends React.Component {

    componentDidMount() {
      // store.dispatch(fetchAudio())
      //joinChatRoom('lobby')
      
    }
  
    render() {
        return (
            <div>
                <h1>Log in to GloboWalk</h1>
                <form onSubmit={this.props.login}>
                    <div>
                        <input
                            key="name"
                            name="email"
                            type="email"
                            placeholder="email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            key="password"
                            name="password"
                            type="password"
                            placeholder="password"
                            required
                        />
                        <button type="submit">Log In</button>
                    </div>
                </form>
                <button type="submit" onClick={this.props.logout}>Logout</button>
                <div>
                    <a target="_self" href="/api/auth/google/login">
                        <span className="fa fa-google" ></span>
                        Log in with Google
                    </a>
                </div>
                <Link to ="/signup"> Sign Up </Link>
            </div>
        )
    }
}

/*-------Container-----------*/


const mapState = null;

const mapDispatch = dispatch => ({
    login(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        dispatch(login(email, password));
    },
    logout() {
        dispatch(logout());
    },
});

export default connect(mapState, mapDispatch)(Login)