import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {logout} from '../redux/reducers/auth';
// import { Row, Col, Input, Navbar, NavItem, Icon, Button } from 'react-materialize';

class NavBar extends React.Component {

  constructor(props) {
    super(props)

    this.stopClick = this.stopClick.bind(this);
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
  }

  stopClick(evt) {
    evt.preventDefault();
  }

  handleSubmitLogout(evt) {
    evt.preventDefault();

    this.props.logout();
  }

  render() {

    return (
      // <nav className="white" role="navigation">
        <nav className="nav-wrapper blue">
          <div className="container">
          <a id="logo-container" href="/" className="brand-logo">
            Globo Walk <i className='medium material-icons hide-on-small-only'>language</i>
          </a>
              <ul className="right">
                  {
                    this.props.chatroom && this.props.chatroom.chatroom.name &&
                    <li><a href="/" onClick={this.stopClick}><i className="material-icons left">chat_bubble</i>{this.props.chatroom.chatroom.name}</a></li>
                  }
                <li>
                    {
                      this.props.auth && this.props.auth.name
                      ? <a href="/" onClick={this.handleSubmitLogout}>Logout</a>
                      : <a href="/login">Login</a>
                    }
                </li>
                {/* <li>
                    {
                      this.props.auth && this.props.auth.name
                      ? <span>{"Welcome, " + this.props.auth.name} 
                          <a onClick={this.handleSubmitLogout}> Logout </a>
                        </span>
                      : <a href="/login">Login</a>
                    }
                </li> */}
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