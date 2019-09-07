const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class ProfileCach {
  constructor() {
    this.cache = cache;
    this.profileKey = "profile";
  }

  setProfile(profile) {
    this.cache.set(this.profileKey, profile);
  }
  getProfile() {
    return this.cache.get(this.profileKey);
  }

  deleteProfile() {
    this.cache.del(this.profileKey);
  }
}

module.exports = ProfileCach;
