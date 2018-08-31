class Ui {
  constructor() {
    this.location = document.getElementById("w-location");
    this.icon = document.getElementById("w-icon");
    this.condition = document.getElementById("w-condition");
    this.temp = document.getElementById("w-temp");
    this.humidity = document.getElementById("w-humidity");
    this.wind = document.getElementById("w-wind");
    this.desc = document.getElementById("w-state");
    this.countries = document.getElementById("countries");
    this.cities = document.getElementById("cities");
    this.regions = document.getElementById("regions");
    this.options = document.querySelectorAll("option");
  }
  showWeather(data) {
    this.location.textContent = `${data.name}, ${data.sys.country}`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    );
    this.condition.textContent = `Weather State : ${
      data.weather[0].description
    }`;
    this.desc.textContent = `${data.weather[0].main}`;
    this.temp.innerHTML = `Temperature : ${data.main.temp} &#8451;`;
    this.humidity.textContent = `Humidity : ${data.main.humidity}`;
    this.wind.textContent = `Wind Speed : ${data.wind.speed}`;
  }

  showCountries(countries) {
    const selectCountries = this.countries;
    for (let i = 0; i < countries.length; i++) {
      const opt = document.createElement("option");
      opt.setAttribute("value", countries[i].code);
      opt.textContent = countries[i].name;
      selectCountries.appendChild(opt);
    }
  }

  showRegions(regions) {
    this.regions.innerHTML = "<option>select Region/State...</option>";
    this.cities.innerHTML = "<option value='none'>select city...</option>";
    for (let i = 0; i < regions.length; i++) {
      const opt = document.createElement("option");
      opt.setAttribute("value", regions[i].region);
      opt.textContent = regions[i].region;
      this.regions.appendChild(opt);
    }
  }

  showCities(cities) {
    this.cities.innerHTML = "<option value='none'>select city...</option>";
    for (let i = 0; i < cities.length; i++) {
      const opt = document.createElement("option");
      opt.setAttribute("value", cities[i].city);
      opt.textContent = cities[i].city;
      this.cities.appendChild(opt);
    }
  }

  clearAll() {
    if (this.countries.value === "none") {
      this.regions.innerHTML = "<option>Select Region/State...</option>";
      this.cities.innerHTML = "<option>Select city...</option>";
    }
  }

  showError() {
    const card = document.getElementById("card");
    const div = document.createElement("div");
    if (document.getElementById("alert") === null) {
      div.classList.add("alert", "alert-danger");
      div.id = "alert";
      div.appendChild(
        document.createTextNode(
          "The Weather for selected location is not available"
        )
      );
      card.insertBefore(div, this.location);
      setTimeout(() => {
        div.remove();
      }, 4000);
    }
  }
  showError2() {
    const form = document.getElementById("form");
    const modal = document.getElementById("modal");
    if (document.getElementById("alert1") === null) {
      const div = document.createElement("div");
      div.classList.add("alert", "alert-danger");
      div.id = "alert1";
      div.appendChild(
        document.createTextNode("please select country and city")
      );
      modal.insertBefore(div, form);

      setTimeout(() => {
        div.remove();
      }, 4000);
    }
  }
}
