class Ls {
  setLocation(city, country) {
    localStorage.setItem("city", city);
    localStorage.setItem("country", country);
  }

  getLocation() {
    if (localStorage.getItem("city") !== null) {
      const city = localStorage.getItem("city");
      const country = localStorage.getItem("country");
      return {
        city,
        country
      };
    } else {
      return {
        city: "New York",
        country: "us"
      };
    }
  }

  clearLs() {
    localStorage.clear();
  }
}
