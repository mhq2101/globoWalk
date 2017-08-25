import React from 'react';
import { Preloader } from 'react-materialize';

export default class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }

    this.map;
    this.geocoder;
    this.markers = [];

    this.initializeMap = this.initializeMap.bind(this);
    this.addSearchBox = this.addSearchBox.bind(this);
    this.setInitialCoordinates = this.setInitialCoordinates.bind(this);
    this.setDefaultCoordinates = this.setDefaultCoordinates.bind(this);
    this.setInputCoordinates = this.setInputCoordinates.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.getPlaceFromLatLng = this.getPlaceFromLatLng.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setInitialCoordinates, this.setDefaultCoordinates);
    } else {
      this.setDefaultCoordinates(new Error("GeoLocation service not available in your browser."));
    }

    this.setState({loading: false});
  }

  initializeMap(initialLatitude, initialLongitude) {
    let mapOptions = {
      center: new google.maps.LatLng(initialLatitude, initialLongitude),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };

    this.map = new google.maps.Map(document.getElementById("location-map"), mapOptions);
    this.geocoder = new google.maps.Geocoder();

    this.addSearchBox();
    let latlng = new google.maps.LatLng(initialLatitude, initialLongitude);
    this.geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let place = results[0];

        if (place) {
          this.addMarker(place);
          this.setInputCoordinates(place);
        }
      }
    });

    this.map.addListener("click", (event) => {
      let latitude = event.latLng.lat();
      let longitude = event.latLng.lng();

      this.map.panTo(event.latLng);

      let latlng = new google.maps.LatLng(latitude, longitude);
      this.geocoder.geocode({ 'latLng': latlng }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let place = results[0];

          if (place) {
            this.addMarker(place);
            this.setInputCoordinates(place);
          }
        }
      });
    });
  }  // end initializeMap

  setInitialCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.initializeMap(latitude, longitude);
  }

  setDefaultCoordinates(error) {
    console.error("Unable to get current location: ", error.message);

    // Hoboken, NJ
    let hoboken_latitude = 40.7398706;
    let hoboken_longitude = -74.0293613;
    this.initializeMap(hoboken_latitude, hoboken_longitude);
  }

  getPlaceFromLatLng(latitude, longitude) {
    let latlng = new google.maps.LatLng(latitude, longitude);
    this.geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let place = results[0];

        if (place) {
          this.addMarker(place);
          this.setInputCoordinates(place);
        }
      }
    });
  }

  setInputCoordinates(place) {
    let location = place.geometry.location;

    let location_info = {
      latitude: location.lat(),
      longitude: location.lng(),
      location_name: place.formatted_address
    };

    this.props.updateLocationFields(location_info);
  }

  clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  addMarker(place) {
    // Clear all previous markers
    this.clearMarkers();

    let icon = {
      url: (place.icon || 'http://maps.google.com/mapfiles/ms/micons/red.png'),
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    this.markers.push(new google.maps.Marker({
      map: this.map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));
  }

  addSearchBox() {
    // Create the search box and link it to the UI element.
    let input = document.getElementById('places-search');
    let searchBox = new google.maps.places.SearchBox(input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces();

      if (places.length === 0) return;

      // Clear out the old markers.
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          return;
        }

        this.addMarker(place);
        this.setInputCoordinates(place);

        let viewport = place.geometry.viewport;
        let location = place.geometry.location;

        if (viewport) {
          // Only geocodes have viewport.
          bounds.union(viewport);
        } else {
          bounds.extend(location);
        }
        let latitude = location.lat();
        let longitude = location.lng();
      });
      this.map.fitBounds(bounds);
    });
  }



  render() {
    return (
      <div>
        {this.state.loading && <Preloader size='big' flashing />}
        <input id="places-search" type="text" placeholder="Search Locations" />
        <div id="location-map"></div>
      </div>

    )
  }
}