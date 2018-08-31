class Map {
  initMap() {
    const map = new google.maps.Maps(document.getElementById("map"), {
      zoom: 12,
      center: this.getCords
    });
  }

  getCords() {
    if (navigator.geolocation) {
      let coords = {};
      navigator.geolocation.getCurrentPosition(position => {
        coords.lat = position.coords.latitude;
        coords.long = position.coords.longitude;
        return coords;
      });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }
}
