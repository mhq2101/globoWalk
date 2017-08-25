import React from 'react';
import { connect } from 'react-redux'
import { login, logout, signup } from '../redux/reducers/auth';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, ToastMessage } from 'react-toastr'
import { Row, Col, Input, Navbar, NavItem, Icon, Button } from 'react-materialize';
import NavBar from './NavBar.jsx';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

/* -------Component--------- */

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.addAlert = this.addAlert.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    addAlert() {
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
                {/* <NavBar/> */}
                <div className="valign-wrapper blue lighten-2" style={{ height: "100%" }}>
                    <div className="centered-signup-form white">
                        <h4 className="center-align">Sign Up</h4>
                        <ToastContainer ref={(input) => { this.container = input; }}
                            toastMessageFactory={ToastMessageFactory}
                            className="toast-top-right"
                        />
                        <form onSubmit={this.submitHandler}>
                            <Row>
                                <Input s={12}
                                    key="name"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    required
                                >
                                    <Icon>person</Icon>
                                </Input>
                            </Row>
                            <Row>
                                <Input s={12}
                                    key="email"
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
                                    <Button className="btn-login blue lighten-1" type="submit">Sign Up</Button>
                                    <div>
                                        <a target="_self" href="/api/auth/google/login" className="btn btn-login btn-google-login">
                                            <i className="fa fa-google btn-google-icon" aria-hidden="true"></i>Google
                                        </a>
                                    </div>
                                    <p className="center">------- OR ------</p>
                                    <Link className="btn btn-login blue lighten-1" to="/login">Login</Link>
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