const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cron = require("node-cron");
const helmet = require("helmet");

const Scraper = require("./modules/linkedinScraper");
const scraper = new Scraper("https://www.linkedin.com/in/pawlak-mike/");

const Cache = require("./modules/cache");
const cache = new Cache();

cron.schedule("30 1 * * *", async () => {
  cache.deleteProfile();
  const profile = await scraper.getProfile();
  cache.setProfile(profile);
});

app.use(helmet());

app
  .get("/", (req, res) => {
    res.send(":D");
  })
  .get("/v1/profile", async (req, res) => {
    if (cache.getProfile()) {
      res.send(cache.getProfile());
    } else {
      const profile = await scraper.getProfile();
      cache.setProfile(profile);
      res.send(profile);
    }
  });

app.listen(port, () => console.log(`LknApi app listening on port ${port}!`));
