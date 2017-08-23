import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {logout} from '../redux/reducers/auth';
import { Row, Col, Input, Navbar, NavItem, Icon, Button } from 'react-materialize';

class NavBar extends React.Component {

  render() {

    return (
      // <nav className="white" role="navigation">
        <nav className="nav-wrapper blue">
          <div className="container">
          <a id="logo-container" href="/" className="brand-logo">
            Globo Walk <i className='medium material-icons'>language</i>
          </a>
              <ul className="right">
              <li>
                    {
                      this.props.chatroom && this.props.chatroom.chatroom.name
                      ? <Col>{"You are in Group " + this.props.chatroom.chatroom.name}</Col>
                      : ""
                    }
                </li>
                <li>
                    {
                      this.props.auth && this.props.auth.name
                      ? <Col>{"Welcome, " + this.props.auth.name} 
                          <Button onClick={this.props.logout} type="submit"> Logout </Button>
                        </Col>
                      : <a href="/login">Login</a>
                    }
                </li>
              </ul>
            </div>
        </nav>
      // </nav>
    );
  }
}

const mapState = ({ auth, chatroom }) => ({
  auth,
  chatroom
})

const mapDispatch = function (dispatch) {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NavBar))