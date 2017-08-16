import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { login, logout, signup } from '../redux/reducers/auth';
import { Link } from 'react-router-dom';

/* -------Component--------- */

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.goToChatroom = this.goToChatroom.bind(this);
      }

    goToChatroom (evt) {
        return(
            <div>
                <Redirect to="/chatroom/1" />
                <ChatroomPage/>
            </div>
          )
    }

    render() {
        return (
            <div>
                <h1>This is the Home Route</h1>
                <form onSubmit={this.props.signup}>
                    <div>
                        <input
                            key="name"
                            name="name"
                            type="name"
                            placeholder="name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            key="email"
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
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
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
                <div>
                    <Link to ='/chatroom/1'> Select Chatroom </Link>
                </div>
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
    signup(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        dispatch(signup(name, email, password));
    }
});

export default connect(mapState, mapDispatch)(Home)