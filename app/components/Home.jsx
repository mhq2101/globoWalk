import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import Footer from './Footer';

export default class Home extends React.Component {

  componentDidMount() {
    // Needed for materialize
    $('.parallax').parallax();
  }

  render() {

    return (
      <div>
        <NavBar />

        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br /><br />
              <h1 className="header center blue-text">Globo Walk</h1>
              <div className="row center">
                <h5 className="header col s12 light">A virtual space for friends to hang-out and travel</h5>
              </div>
              <div className="row center btn-begin-journey">
                <Link to="/login" className="btn-large waves-effect waves-light blue lighten-1">Get Started</Link>
              </div>
              <br />
              <br />
            </div>
          </div>
          <div className="parallax">
            <img src="images/paris_1728x612.jpg" alt="Paris" />
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center blue-text"><i className="material-icons">airplanemode_active</i></h2>
                  <h5 className="center">No Flying Required</h5>

                  <p className="light" className="center-align">
                    With Globo Walk, you can travel with your friends and family from the comfort of your own home.
                    No expensive tickets.  No uncomfortable seats.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center blue-text"><i className="material-icons">group</i></h2>
                  <h5 className="center">Group Hangouts</h5>

                  <p className="light" className="center-align">Create a group and invite your friends or join an existing group and meet new people.</p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center blue-text"><i className="material-icons">blur_on</i></h2>
                  <h5 className="center">Virtual Reality</h5>

                  <p className="light" className="center-align">Take a 360&deg; virtual tour of just about anywhere and walk around as you immerse yourself in the local environment.</p>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                {/* <h5 className="header col s12 light">A header for the text below.</h5> */}
              </div>
            </div>
          </div>
          <div className="parallax">
            <img src="images/rio_de_janeiro-carnaval_1920x1280.jpg" alt="Carnaval - Rio De Janeiro" />
          </div>
        </div>

        <div className="container">
          <div className="section">

            <div className="row">
              <div className="col center">
                <h3><i className="mdi-content-send brown-text"></i></h3>
                <h4>Where Do You Want To Go Today?</h4>
                <p className="light">
                  Find a location on Google Maps or select one of your previously saved favorite locations.
                  Invite your friends to join you or take a solo trip.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                {/* <h5 className="header col s12 light">Some totally awesome text can go here.</h5> */}
              </div>
            </div>
          </div>
          <div className="parallax">
            <img src="images/melbourne-park_1150x863.jpg" alt="Melbourne, Australia" />
          </div>
        </div>

        <Footer />

      </div>)
  }
}