import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="page-footer blue">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col m8 offset-m4">
                <h5 className="white-text">Fullstack Capstone Project</h5>
                <p className="grey-text text-lighten-4">Brought to you by some awesome developers.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container"></div>
        </div>
      </footer>
    );
  }
}
