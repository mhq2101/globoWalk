import React from 'react';
import { connect } from 'react-redux';
import panorama from 'google-panorama-by-location/node';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Input, Collapsible, CollapsibleItem } from 'react-materialize';

import { setCurrentPanoId } from '../redux/reducers/panoId';
import { joinAndGo } from '../redux/reducers/chatroom.jsx';
import GoogleMap from './GoogleMap';


class LocationSelection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      location_name: '',
      error_message: '',
      suggested_latitude: '',
      suggested_longitude: '',
      suggested_error_message: '',
      disable_button: true
    }

    this.callPanorama = this.callPanorama.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.updateLocationFields = this.updateLocationFields.bind(this);
  }

  updateLocationFields(location) {
    this.setState({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      location_name: location.location_name,
      error_message: ''
    });
  }

  callPanorama(location) {
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

  handleLocationChange(evt) {
    // Selected value from the drop down list
    let value = evt.target.value;

    if (!value) {
      this.setState({
         suggested_error_message: "Please select a location",
         disable_button: true
        });
    } else {
      let location_latLng = value.split(',');

      this.setState({
        suggested_latitude: location_latLng[0],
        suggested_longitude: location_latLng[1],
        suggested_error_message: '',
        disable_button: false
      });
    }
  }

  handleLocationClick(evt) {
    evt.preventDefault();

    let latitude = this.state.suggested_latitude;
    let longitude = this.state.suggested_longitude;

    if (latitude !== '' && longitude !== '') {
      let location = [Number(this.state.suggested_latitude), Number(this.state.suggested_longitude)];
      console.log("Location: ", location);
      this.callPanorama(location);
    } else {
      this.setState({ suggested_error_message: "" })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let location = [Number(this.state.latitude), Number(this.state.longitude)];
    this.callPanorama(location);
  }

  componentDidMount() {
    if (!this.props.chatroom.chatroom.id) {
      this.props.joinAndGo(this.props.match.params.name)
    }
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <h2>Locations</h2>
          <button onClick={() => this.props.history.push(`/user/chatroom/${this.props.chatroom.chatroom.name}`)}>Return To Chatroom</button>
          <Collapsible defaultActiveKey={1} accordion>
            <CollapsibleItem header='Suggested Locations' icon='thumb_up'>
              <p>
                Select from a list of popular destinations:
              </p>
              <Input m={6} type='select' defaultValue="" label="Choose a destination" defaultValue="" onChange={this.handleLocationChange}>
                <option value=""></option>
                <option value="35.699646,139.7714361">Akihabara, Tokyo, Japan</option>
                <option value="8.0304624,98.8228789">Ao Nang, Thailand</option>
                <option value="52.5150699,13.39304">Berlin, Germany</option>
                <option value="52.3757185,4.8859332">Amsterdam, Holland</option>
                <option value="-22.9691146,-43.1805221">Rio de Janeiro, Brazil</option>
                <option value="51.4990448,-0.1259515">London, England</option>
                <option value="48.8742824,2.2931533">Paris, France</option>
                <option value="40.4179027,-3.7095963">Madrid, Spain</option>
                <option value="41.4026222,2.1743372">Barcelona, Spain</option>
                <option value="41.8956621,12.4829993">Rome, Italy</option>
                <option value="43.7734676,11.2553835">Florence, Italy</option>
                <option value="47.5019311,19.0348175">Budapest, Hungary</option>
              </Input>
              <Button type="button" onClick={this.handleLocationClick} disabled={this.state.disable_button}>Let's Go</Button>
              {this.state.suggested_error_message &&
                      <div className="card-panel red lighten-3">
                        <span className="red-text text-darken-2">{this.state.suggested_error_message}</span>
                      </div>
                    }
            </CollapsibleItem>
            <CollapsibleItem header='Search Locations' icon='place'>
              <form name="form-map" onSubmit={this.handleSubmit}>
                <Row>
                  <Col s={12}>
                    <h6>{this.state.location_name}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col s={6}>
                    <label>Latitude</label>
                    <input type="text" name="latitude" value={this.state.latitude} disabled />
                    <label>Longitude</label>
                    <input type="text" name="longitude" value={this.state.longitude} disabled />
                  </Col>
                </Row>
                <Row>
                  <Col s={12}>
                    <Button type="submit" waves='light'>Select</Button>
                    {this.state.error_message &&
                      <div className="card-panel red lighten-3">
                        <span className="red-text text-darken-2">{this.state.error_message}</span>
                      </div>
                    }
                  </Col>
                </Row>
              </form>
              <Row>
                <Col s={12}>
                  <GoogleMap updateLocationFields={this.updateLocationFields} />
                </Col>
              </Row>
            </CollapsibleItem>
          </Collapsible>
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

const mapDispatchToProps = { setCurrentPanoId, joinAndGo };

// const mapDispatch = function (dispatch) {
//   return {
//     joinAndGo(name) {
//       dispatch(joinAndGo(name))
//     }
//   }
// };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationSelection))
