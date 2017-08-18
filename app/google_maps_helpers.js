export default class GoogleMap {

  constructor() {
    this.map;
    // this.initialCenter;
    // this.initialZoom;
    this.geocoder;
    this.selectedCoordinates = [];

    this.initializeMap = this.initializeMap.bind(this);
    this.addSearchBox = this.addSearchBox.bind(this);
    this.setInitialCoordinates = this.setInitialCoordinates.bind(this);
    this.setDefaultCoordinates = this.setDefaultCoordinates.bind(this);
    this.setInputCoordinates = this.setInputCoordinates.bind(this);

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

    // this.initialCenter = mapOptions.center;
    // this.initialZoom = mapOptions.zoom;

    this.addSearchBox();
    this.setInputCoordinates(initialLatitude, initialLongitude);
  }

  setInputCoordinates(latitude, longitude) {
    console.log('Made it to set input coordinates');
    document.getElementById('coord-latitude').value = latitude.toString();
    document.getElementById('coord-longitude').value = longitude.toString();
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

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces();

      if (places.length === 0) return;

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        let icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: this.map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        this.selectedCoordinates = [latitude, longitude];

        console.log("Place Obj: ", place);
        // console.log("Place Geometry Latitude: ", latitude);
        // console.log("Place Geometry Longitude: ", longitude);

        document.getElementById('coord-name').innerHTML = place.formatted_address;
        this.setInputCoordinates(latitude, longitude);
        // document.getElementById('coord-latitude').value = latitude.toString();
        // document.getElementById('coord-longitude').value = longitude.toString();
      });
      this.map.fitBounds(bounds);
    });
  }
}