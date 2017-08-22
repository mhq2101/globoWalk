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
      location_name: '',
      error_message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateLocationFields = this.updateLocationFields.bind(this);
  }

  updateLocationFields(location) {
    this.setState({
      latitude: location.latitude,
      longitude: location.longitude,
      location_name: location.location_name,
      error_message: ''
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let location = [Number(this.state.latitude), Number(this.state.longitude)];

    const options = { radius: 400 };
    panorama(location, options, (err, result) => {
      if (err) {
        console.log("Panorama Error: ", err);
        this.setState({ error_message: "Street View not available for location" });

        return;
      }

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
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col s12">
                <h2>Location</h2>
                <button onClick={() => this.props.history.push(`/user/chatroom/${this.props.chatroom.chatroom.name}`)}>Return To Chatroom</button>
                <h6>{this.state.location_name}</h6>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <label>Latitude</label>
                <input type="text" name="latitude" value={this.state.latitude} disabled />
                <label>Longitude</label>
                <input type="text" name="longitude" value={this.state.longitude} disabled />
                <button type="submit" className="waves-effect waves-light btn">Select</button>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                {this.state.error_message &&
                  <div className="card-panel red lighten-3">
                    <span className="red-text text-darken-2">{this.state.error_message}</span>
                  </div>
                }
              </div>
            </div>
          </form>
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

const mapStateToProps = ({ auth, chatroom, audioStream, audioCtx, webrtc }) => ({
  auth,
  chatroom,
  audioStream,
  audioCtx,
  webrtc
});

const mapDispatchToProps = { setCurrentPanoId };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationSelection))
