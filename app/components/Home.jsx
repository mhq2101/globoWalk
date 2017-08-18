import React from 'react';
import { connect } from 'react-redux'
import { login, logout, signup } from '../redux/reducers/auth';
import { Link } from 'react-router-dom';

/* -------Component--------- */

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>Welcome to GloboWalk</h1>
                <h5>New User? Sign Up here!</h5>
                <form className="col s12" onSubmit={this.props.signup}>
                    <div className="row">
                        <input className="validate"
                            key="name"
                            name="name"
                            type="name"
                            placeholder="name"
                            required
                        />
                    </div>
                    <div className="row">
                        <input
                            key="email"
                            name="email"
                            type="email"
                            placeholder="email"
                            required
                        />
                    </div>
                    <div className="row">
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
                    <div className="row">
                        <input
                            key="name"
                            name="email"
                            type="email"
                            placeholder="email"
                            required
                        />
                    </div>
                    <div className="row" >
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