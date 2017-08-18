import React from 'react';
import { connect } from 'react-redux';
import panorama from 'google-panorama-by-location';
import { withRouter } from 'react-router-dom';

import { setCurrentPanoId } from '../redux/reducers/panoId';
import GoogleMap from '../google_maps_helpers';


class LocationSelection extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // -22.9691146,-43.1805221
    let location = evt.target.locations.value.split(',')
      .map(coordinate => Number(coordinate));

    console.log("Location: ", location);
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

  handleClick(evt) {
    let latitude = document.getElementById('coord-latitude').value;
    let longitude = document.getElementById('coord-longitude').value;
    let location = [Number(latitude), Number(longitude)];

    console.log("Lat: ", latitude);
    console.log("Lng:", longitude);
    console.log("Location: ", location);

    let options = {
      radius: 1000
    };

    panorama(location, options, (err, result) => {
      if (err) throw err;

      // pano ID
      let panoId = result.id;
      console.log("Pano Id: ", panoId);
      this.props.setCurrentPanoId(location);

      this.props.history.push("/aframe");
    });
  }

  handleChange(evt) {
    // this.setState({})
    evt.persist();
    console.log(evt);
  }

  componentDidMount() {
    let mapHelper = new GoogleMap();
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
          <div className="row">
            <div className="col s8">
              <input id="places-search" type="text" placeholder="Search Locations" />
              <div id="location-map"></div>
            </div>
            <div className="col s4">
              <h2>Location</h2>
              <div id="coord-name"></div>
              <input id="coord-latitude" type="text" name="latitude" onChange={this.handleChange} disabled />
              <input id="coord-longitude" type="text" name="longitude" onChange={this.handleChange} disabled />
              <a className="waves-effect waves-light btn" onClick={this.handleClick}>Select</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = { setCurrentPanoId };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationSelection))
