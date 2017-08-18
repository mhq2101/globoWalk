export default class GoogleMap {

  constructor() {
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


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setInitialCoordinates, this.setDefaultCoordinates);
    } else {
      this.setDefaultCoordinates(new Error("GeoLocation service not available in your browser."));
    }
  }

  setInitialCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.initializeMap(latitude, longitude);
  }

  setDefaultCoordinates(error) {
    console.log("Unable to get current location: ", error.message);

    // Hoboken, NJ
    let hoboken_latitude = 40.7398706;
    let hoboken_longitude = -74.0293613;
    this.initializeMap(hoboken_latitude, hoboken_longitude);
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

          if (place){
            this.addMarker(place);
            this.setInputCoordinates(place);
          } else {
            console.log("Unable to get place from click event.");
          } 

          // this.setInputCoordinates(latitude, longitude);
        }
      });

    // let place = this.getPlaceFromLatLng(initialLatitude, initialLongitude);
    // this.setInputCoordinates(place);

    this.map.addListener("click", (event) => {
      let latitude = event.latLng.lat();
      let longitude = event.latLng.lng();

      this.map.panTo(event.latLng);
      // this.getPlaceFromLatLng(latitude, longitude);

      let latlng = new google.maps.LatLng(latitude, longitude);
      this.geocoder.geocode({ 'latLng': latlng }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let place = results[0];

          if (place){
            this.addMarker(place);
            this.setInputCoordinates(place);
          } else {
            console.log("Unable to get place from click event.");
          } 

          // this.setInputCoordinates(latitude, longitude);
        }
      });
    })
  }

  getPlaceFromLatLng(latitude, longitude) {
    let latlng = new google.maps.LatLng(latitude, longitude);
      this.geocoder.geocode({ 'latLng': latlng }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let place = results[0];

          if (place) {
            this.addMarker(place);
            this.setInputCoordinates(place);
          } else {
            console.log("Problem retrieving place from Lat Lng.");
          }
        }
      });
  }

  // setInputCoordinates(latitude, longitude) {
  //   document.getElementById('coord-latitude').value = latitude.toString();
  //   document.getElementById('coord-longitude').value = longitude.toString();
  // }

  setInputCoordinates(place) {
    let location = place.geometry.location;
    document.getElementById('coord-name').innerHTML = place.formatted_address;
    document.getElementById('coord-latitude').value = location.lat();//.toString();
    document.getElementById('coord-longitude').value = location.lng();//.toString();
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
      url: place.icon,
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

    document.getElementById('coord-name').innerHTML = place.formatted_address;
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

    // let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces();

      if (places.length === 0) return;

      console.log("Markers: ", this.markers);
      // Clear out the old markers.
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        this.addMarker(place);

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

        // console.log("Place Obj: ", place);
        // console.log("Place Geometry Latitude: ", latitude);
        // console.log("Place Geometry Longitude: ", longitude);

        // document.getElementById('coord-name').innerHTML = place.formatted_address;
        // this.setInputCoordinates(latitude, longitude);
        // document.getElementById('coord-latitude').value = latitude.toString();
        // document.getElementById('coord-longitude').value = longitude.toString();
      });
      this.map.fitBounds(bounds);
    });
  }
}