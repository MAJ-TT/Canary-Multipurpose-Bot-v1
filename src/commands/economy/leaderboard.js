const Discord = require("discord.js");
const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
  const type = interaction.options.getString("type");

  if (type == "money") {
    const rawLeaderboard = await Schema.find().sort([["Money", "descending"]]);

    if (!rawLeaderboard)
      return client.errNormal(
        {
          error: "No data found!",
          type: "editreply",
        },
        interaction
      );

    const seenUsers = new Map();
    const lb = [];

    rawLeaderboard.forEach((e, index) => {
      if (seenUsers.has(e.User)) return;

      seenUsers.set(e.User, { index, data: e });
      lb.push(
        `**${index + 1}** | <@!${e.User}> - ${client.emotes.economy.coins} \`$${
          e.Money
        }\``
      );
    });

    await client.createLeaderboard(
      `${client.emotes.economy.coins}・State Money Leaderboard`,
      lb,
      interaction
    );
  } else if (type == "bank") {
    const rawLeaderboard = await Schema.find().sort([["Bank", "descending"]]);

    if (!rawLeaderboard)
      return client.errNormal(
        {
          error: "No data found!",
          type: "editreply",
        },
        interaction
      );

    const seenUsers = new Map();
    const lb = [];

    rawLeaderboard.forEach((e, index) => {
      if (seenUsers.has(e.User)) return;

      seenUsers.set(e.User, { index, data: e });
      lb.push(
        `**${index + 1}** | <@!${e.User}> - ${client.emotes.economy.bank} \`$${
          e.Bank
        }\``
      );
    });

    await client.createLeaderboard(
      `${client.emotes.economy.bank}・State Bank Leaderboard`,
      lb,
      interaction
    );
  }
};
