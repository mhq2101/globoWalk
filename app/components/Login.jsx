import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, logout } from '../redux/reducers/auth';
import { ToastContainer, ToastMessage } from 'react-toastr'
import { setCurrentChatroom } from '../redux/reducers/chatroom';
import { Row, Col, Input, Navbar, NavItem, Icon, Button } from 'react-materialize';
import NavBar from './NavBar.jsx';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

/* -------Component--------- */

class Login extends React.Component {
    constructor() {
        super()
        this.addAlert = this.addAlert.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    addAlert() {
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

    componentDidMount() {
        if (!this.props.auth.name) {
            this.props.setCurrentChatroom({})
        }
    }

    render() {
        return (
            <div>
                {/* <NavBar/> */}
                <div className="valign-wrapper blue lighten-2" style={{ height: "100%" }}>
                    <div className="centered-login-form white">
                        <h4 className="center-align">Log In</h4>
                        <ToastContainer ref={(input) => { this.container = input; }}
                            toastMessageFactory={ToastMessageFactory}
                            className="toast-top-right"
                        />
                        <form onSubmit={this.submitHandler}>
                            <Row>
                                <Input s={12}
                                    key="name"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    required
                                >
                                    <Icon>email</Icon>
                                </Input>
                            </Row>
                            <Row>
                                <Input s={12}
                                    key="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    required
                                >
                                    <Icon>lock</Icon>
                                </Input>
                            </Row>
                            <Row>
                                <Col s={12}>
                                    <Button className="btn-login blue lighten-1" type="submit">Log In</Button>
                                    <div>
                                        <a target="_self" href="/api/auth/google/login" className="btn btn-login btn-google-login">
                                            <i className="fa fa-google btn-google-icon" aria-hidden="true"></i>Google
                                        </a>
                                    </div>
                                    <p className="center">------- OR ------</p>
                                    <Link className="btn btn-login blue lighten-1" to="/signup">Sign Up</Link>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

/*-------Container-----------*/


const mapState = ({ auth, chatroom }) => ({
    auth,
    chatroom,
});

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
    setCurrentChatroom(chatroom) {
        dispatch(setCurrentChatroom(chatroom));
    },
});

export default connect(mapState, mapDispatch)(Login)