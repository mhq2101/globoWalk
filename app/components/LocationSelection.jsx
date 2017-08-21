import React from 'react';
import { connect } from 'react-redux';
import panorama from 'google-panorama-by-location/node';
import { withRouter } from 'react-router-dom';

import { setCurrentPanoId } from '../redux/reducers/panoId';
import GoogleMap from './GoogleMap';


class LocationSelection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      location_name: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateLocationFields = this.updateLocationFields.bind(this);
  }

  updateLocationFields(location) {
    console.log("Passed Location Obj: ", location);
    this.setState({
      latitude: location.latitude,
      longitude: location.longitude,
      location_name: location.location_name
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let location = [Number(this.state.latitude), Number(this.state.longitude)];

    const options = { radius: 400 };
    panorama(location, options, (err, result) => {
      if (err) throw err;

      // pano ID
      let panoId = result.id;
      this.props.setCurrentPanoId(panoId);

      this.props.history.push("/aframe");
    });
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s6">
              <form onSubmit={this.handleSubmit}>
                <h2>Location</h2>
                <h6 id="coord-name">{this.state.location_name}</h6>
                <input id="coord-latitude" type="text" name="latitude" value={this.state.latitude} disabled />
                <input id="coord-longitude" type="text" name="longitude" value={this.state.longitude} disabled />
                <button type="submit" className="waves-effect waves-light btn">Select</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <GoogleMap updateLocationFields={this.updateLocationFields} />
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
