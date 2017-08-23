import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, logout } from '../redux/reducers/auth';
import {ToastContainer, ToastMessage} from 'react-toastr'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

/* -------Component--------- */

class Login extends React.Component {
    constructor() {
        super()
        this.addAlert = this.addAlert.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    addAlert () {
        this.container.error(
          "",
          "User Information Not Found", {
          timeOut: 6000,
          extendedTimeOut: 1500
        });
      }
    
    submitHandler(event) {
        this.props.login(event).catch(err => {
            if (err) this.addAlert()
        })
    }

    render() {
        return (
            <div>
                <h1>Log in to GloboWalk</h1>
                <ToastContainer ref={(input) => {this.container = input;}}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                />
                <form onSubmit={this.submitHandler}>
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
                <button type="submit">Logout</button>
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
        return dispatch(login(email, password))
        dispatch(login(email, password));
    },
    logout() {
        dispatch(logout());
    },
});

export default connect(mapState, mapDispatch)(Login)