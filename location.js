class Location {
  constructor() {
    this.key = "00000000000000000000000000000000";
  }

  async getCountries() {
    const response = await fetch(
      `http://battuta.medunes.net/api/country/all/?key=${this.key}`
    );

    const result = await response.json();

    return {
      result
    };
  }

  async getRegions(country_code) {
    const response = await fetch(
      `http://battuta.medunes.net/api/region/${country_code}/all/?key=${
        this.key
      }`
    );

    const result = await response.json();

    return {
      result
    };
  }

  async getCities(region, country_code) {
    const response = await fetch(
      `https://battuta.medunes.net/api/city/${country_code}/search/?region=${region}&key=${
        this.key
      }`
    );

    const result = await response.json();

    return {
      result
    };
  }
}
