import React from 'react';
import { connect } from 'react-redux'
import { login, logout, signup } from '../redux/reducers/auth';
import { Link, withRouter } from 'react-router-dom';
import {ToastContainer, ToastMessage} from 'react-toastr'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

/* -------Component--------- */

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.addAlert = this.addAlert.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    addAlert () {
        this.container.error(
          "",
          "Email Already In Use", {
          timeOut: 6000,
          extendedTimeOut: 1500
        });
      }

    submitHandler(event) {
        this.props.signup(event).catch(err => {
            if (err) this.addAlert()
        })
    }
    
    render() {
        return (
            <div>
                <h1>Signup:</h1>
                <ToastContainer ref={(input) => {this.container = input;}}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                />
                <form onSubmit={this.submitHandler}>
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
                        <button type="submit">Signup for GloboWalk </button>
                    </div>
                </form>
                <div>
                    <a target="_self" href="/api/auth/google/login">
                        <span className="fa fa-google" ></span>
                        Signup with Google
                    </a>
                </div>
                <Link to ="/login"> Login </Link>
            </div>
        )
    }
}

/*-------Container-----------*/


const mapState = null;

const mapDispatch = dispatch => ({
    signup(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        return dispatch(signup(name, email, password))
        dispatch(signup(name, email, password));
    }
});

export default connect(mapState, mapDispatch)(Signup)