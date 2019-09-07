const scrapedin = require("scrapedin");

class Scraper {
  constructor(url) {
    this.url = url;
    this.email = process.env.EMAIL;
    this.password = process.env.PASSWORD;
  }

  async getProfile() {
    const profileScraper = await scrapedin({
      email: this.email,
      password: this.password
    });
    return await profileScraper(this.url);
  }
}

module.exports = Scraper;
