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

    componentDidMount(){
        if (!this.props.auth.name){
            this.props.setCurrentChatroom({})
        }
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <div className="section">
                        <Row>
                        <h4 className="center-align">Log in to GloboWalk</h4>
                            <Col m={9} offset="m3">
                                
                                <ToastContainer ref={(input) => { this.container = input; }}
                                    toastMessageFactory={ToastMessageFactory}
                                    className="toast-top-right"
                                />
                                <form onSubmit={this.submitHandler}>
                                    <Row>
                                        <Input s={12} m={8} key="name" name="email" type="email" label="Email" required />
                                    </Row>
                                    <Row>
                                        <Input s={12} m={8} key="password" name="password" type="password" label="Password" required />
                                    </Row>
                                    <Row>
                                        <Col m={10} offset="m2">
                                            <Button className="btn-login" type="submit">Log In</Button>
                                            <div>
                                                <a target="_self" href="/api/auth/google/login">
                                                    <img src="/images/btn_google_signin_dark_normal_web.png" />
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                </form>
                            </Col>
                            <div className="center-align">------- OR ------</div>
                            <Row>
                                <Col m={9} offset="m3">
                                    <Col m={10} offset="m2">
                                        <Link className="btn btn-login" to="/signup">Sign Up</Link>
                                    </Col>
                                </Col>
                            </Row>
                        </Row>
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