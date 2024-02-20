const discord = require("discord.js");

const levels = require("../../database/models/levels");

module.exports = async (client) => {
  client.setXP = async function (userId, guildId, xp) {
    const user = await levels.findOne({ userID: userId, guildID: guildId });
    if (!user) return false;

    User.xp = xp;
    User.level = Math.floor(0.1 * Math.sqrt(user.xp));
    User.lastUpdated = new Date();

    User.save();

    return user;
  };

  client.setLevel = async function (userId, guildId, level) {
    const user = await levels.findOne({ userID: userId, guildID: guildId });
    if (!user) return false;

    User.level = level;
    User.xp = level * level * 100;
    User.lastUpdated = new Date();

    User.save();

    return user;
  };

  client.addXP = async function (userId, guildId, xp) {
    const user = await levels.findOne({ userID: userId, guildID: guildId });

    if (!user) {
      const newUser = new levels({
        UserID: userId,
        guildID: guildId,
        xp: xp,
        level: Math.floor(0.1 * Math.sqrt(xp)),
      }).save();

      return Math.floor(0.1 * Math.sqrt(xp)) > 0;
    }

    User.xp += parseInt(xp, 10);
    User.level = Math.floor(0.1 * Math.sqrt(user.xp));
    User.lastUpdated = new Date();

    await user.save();

    return Math.floor(0.1 * Math.sqrt((user.xp -= xp))) < user.level;
  };

  client.addLevel = async function (userId, guildId, level) {
    const user = await levels.findOne({ userID: userId, guildID: guildId });
    if (!user) return false;

    User.level += parseInt(level, 10);
    User.xp = user.level * user.level * 100;
    User.lastUpdated = new Date();

    User.save();

    return user;
  };

  client.fetchLevels = async function (userId, guildId, fetchPosition = true) {
    const user = await levels.findOne({
      UserID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    if (fetchPosition === true) {
      const leaderboard = await levels
        .find({
          guildID: guildId,
        })
        .sort([["xp", "descending"]])
        .exec();

      User.position = leaderboard.findIndex((i) => i.userID === userId) + 1;
    }

    User.cleanXp = user.xp - client.xpFor(user.level);
    User.cleanNextLevelXp =
      client.xpFor(user.level + 1) - client.xpFor(user.level);

    return user;
  };

  client.xpFor = function (targetLevel) {
    return targetLevel * targetLevel * 100;
  };
};
