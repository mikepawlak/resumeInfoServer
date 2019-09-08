const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cron = require("node-cron");
const helmet = require("helmet");

const Scraper = require("./modules/linkedinScraper");
const scraper = new Scraper("https://www.linkedin.com/in/pawlak-mike/");

const Cache = require("./modules/cache");
const cache = new Cache();

const profile = require("./modules/profile");

// cron.schedule("30 1 * * *", async () => {
//   cache.deleteProfile();
//   const profile = await scraper.getProfile();
//   cache.setProfile(profile);
// });

app.use(helmet());

app
  .get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(":D");
  })
  .get("/v1/profile", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // if (cache.getProfile()) {
    //   res.send(cache.getProfile());
    // } else {
    //   const profile = await scraper.getProfile();
    //   let profilePrepped = [];

    //   profile.positions.map(el => {
    //     if (el.roles) {
    //       for (i in el.roles) {
    //         let role = el.roles[i];
    //         profilePrepped.push({
    //           title: role.title,
    //           date1: role.date1,
    //           company: el.title
    //         });
    //       }
    //     } else {
    //       profilePrepped.push(el);
    //     }
    //   });
    //   profile.positions = profilePrepped;
    //   cache.setProfile(profile);
    //   res.send(profile);
    // }

    //until I can figure out how to get this scraper working on headless chrome, I am just returning the object generated from my dev instance
    let profilePrepped = [];
    profile.positions.map(el => {
      if (el.roles) {
        for (i in el.roles) {
          let role = el.roles[i];
          profilePrepped.push({
            title: role.title,
            date1: role.date1,
            company: el.title
          });
        }
      } else {
        profilePrepped.push(el);
      }
    });
    profile.positions = profilePrepped;
    res.json(profile);
  });

app.listen(port, () => console.log(`LknApi app listening on port ${port}!`));
