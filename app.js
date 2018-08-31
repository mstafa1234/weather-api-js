const weather = new Weather();
const ui = new Ui();
const lc = new Location();
const ls = new Ls();
document.addEventListener("DOMContentLoaded", function() {
  // get location from local storage
  // weather.changeLocation(ls.getLocation().city, ls.getLocation().country);
  // getWeather();
  getCountries();
});

// get cities of the selected country
const selectedCountry = document.getElementById("countries");
selectedCountry.addEventListener("change", function() {
  getRegions();
  clearAll();
});

// get regions of selected country
const selectedRegion = document.getElementById("regions");
selectedRegion.addEventListener("change", function() {
  getCities();
});
// modal location change

document.getElementById("w-change-loc").addEventListener("click", e => {
  const city = document.getElementById("cities").value;
  const country = document.getElementById("countries").value;

  // close the modal
  if (city === "none" || country === "none") {
    ui.showError2();
  } else {
    weather.changeLocation(city, country);
    getWeather();
    ls.setLocation(city, country);
    $("#weatherModal").modal("hide");
  }
});

function getWeather() {
  weather
    .getWeather()
    .then(data => {
      ui.showWeather(data.data);
    })
    .catch(() => {
      ls.clearLs();
      ui.showError();
    });
}

function getCountries() {
  lc.getCountries()
    .then(data => {
      ui.showCountries(data.result);
    })
    .catch(err => console.log(err));
}

function getRegions() {
  lc.getRegions(selectedCountry.value)
    .then(data => {
      ui.showRegions(data.result);
    })
    .catch(() => {
      ui.showError();
    });
}

function getCities() {
  lc.getCities(selectedRegion.value, selectedCountry.value)
    .then(data => {
      ui.showCities(data.result);
    })
    .catch(() => {
      ui.showError();
    });
}

function clearAll() {
  ui.clearAll();
}

function getLsCity() {
  const location = ls.getLocation();
}

function initMap() {
  let map;
  if (navigator.geolocation) {
    let coords = {};
    navigator.geolocation.getCurrentPosition(position => {
      coords.lat = position.coords.latitude;
      coords.lng = position.coords.longitude;
      map = new google.maps.Map(document.getElementById("map"), {
        center: coords
      });

      // const myLatlng = new google.maps.LatLng(coords);
      // const myPosition = new google.maps.Marker({
      //     position: myLatlng,
      //     map: map,
      //     animation: google.maps.Animation.DROP,
      //     title: "YOU ARE HERE!!!"
      // });

      infow(coords, map);
    });
  } else {
    console.log("Geolocation is not supported by this browser");
  }
}
function check() {
  console.log("loaded");
}

function infow(coords, map) {
  let infowindow = new google.maps.InfoWindow({ maxWidth: 350 });
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: coords }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(15);
        let marker = new google.maps.Marker({
          position: coords,
          map: map
        }); //end marker

        var infowindowText =
          "<strong>You Are Here</strong><br />" +
          results[1].formatted_address +
          " <br/> Lat : " +
          coords.lat.toFixed(5) +
          " |  Long : " +
          coords.lng.toFixed(5) +
          "<br/>" +
          '<strong><a target="_blank" class="btn btn-primary btn-xs" href="shareme.php?data=' +
          coords.lat +
          "|" +
          coords.lng +
          "|" +
          results[1].formatted_address;
        console.log(results);
        weather.changeLocation(
          results[0].address_components[2].long_name,
          results[0].address_components[3].long_name
        );

        infowindow.setContent(infowindowText);

        infowindow.open(map, marker);
        marker.addListener("click", function() {
          infowindow.open(map, marker);
        });
      }
    } else {
      //console.log("Couldn't determine your location name due to: " + status);
    } //end else
  });
}
