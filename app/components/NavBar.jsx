import React from 'react';


export default class NavBar extends React.Component {

  render() {
    return (
      <nav className="white" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="#" className="brand-logo">
            Globo Walk <i className='medium material-icons'>language</i>
          </a>
        </div>
      </nav>
    );
  }
}
