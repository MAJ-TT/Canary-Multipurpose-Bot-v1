const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
  const type = interaction.options.getString("type");

  if (type == "money") {
    const rawLeaderboard = await Schema.find().sort(([['Money', 'descending']])); // Removed Guild filtering

    if (!rawLeaderboard) return client.errNormal({
      error: "No data found!",
      type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map((e, index) => `**${index + 1}** | <@!${e.User}> - ${client.emotes.economy.coins} \`$${e.Money}\``); // Updated ranking logic

    await client.createLeaderboard(`${client.emotes.economy.bank}・State Money Leaderboard`, lb, interaction); // Updated title
  } else if (type == "bank") {
    const rawLeaderboard = await Schema.find().sort(([['Bank', 'descending']])); // Removed Guild filtering

    if (!rawLeaderboard) return client.errNormal({
      error: "No data found!",
      type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map((e, index) => `**${index + 1}** | <@!${e.User}> - ${client.emotes.economy.bank} \`$${e.Bank}\``); // Updated ranking logic

    await client.createLeaderboard(`${client.emotes.economy.bank}・State Bank Leaderboard`, lb, interaction); // Updated title
  }
};
