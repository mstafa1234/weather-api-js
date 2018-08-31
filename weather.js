class Weather {
  constructor() {
    this.appId = "ee839a7b97d2a8f7f2313c9c2d0943d7";
    this.city = "New York";
    this.country = "us";
  }

  async getWeather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.city},${
        this.country
      }&id=524901&APPID=${this.appId}&units=metric`
    );

    const data = await response.json();

    return {
      data
    };
  }

  changeLocation(city, country) {
    this.city = city;
    this.country = country;
    getWeather();
  }
}
