import React from 'react';
import { connect } from 'react-redux';
import panorama from 'google-panorama-by-location';
import { withRouter } from 'react-router-dom';

import {setCurrentPanoId} from '../redux/reducers/panoId';

class LocationSelection extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // -22.9691146,-43.1805221
    let location = evt.target.locations.value.split(',')
      .map(coordinate => Number(coordinate));

    panorama(location, (err, result) => {
      if (err) throw err;

      // pano ID
      let panoId = result.id;
      console.log("Pano Id: ", panoId);
      this.props.setCurrentPanoId(panoId);

      this.props.history.push("/aframe");
      // actual latitude, longitude
      // console.log(result.latitude)
      // console.log(result.longitude)
    });
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <h1>Select A Location</h1>

              <div className="input-field col s6">
                <select name="locations" defaultValue="" onChange={this.handleChange}>
                  <option value="" disabled>Pick a desired location</option>
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

const mapStateToProps = null;
const mapDispatchToProps = { setCurrentPanoId };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationSelection))
