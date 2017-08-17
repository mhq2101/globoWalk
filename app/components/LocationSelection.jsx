import React from 'react';


export default class LocationSelection extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    evt.persist();
    console.log("Location ", evt.target.locations.value);

    // call google api to get the pano_id.

  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <h1>Select A Location</h1>

              <div className="input-field col s6">
                <select name="locations" onChange={this.handleChange}>
                  <option value="" disabled selected>Pick a desired location</option>
                  <option value="52.5215372,13.4080149">Berlin, Germany</option>
                  <option value="-22.9691146,-43.1805221">Rio de Janeiro, Brazil</option>
                  <option value="48.1445233,17.0796787">Bratislava, Slovakia</option>
                </select>
                <label>Location</label>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
