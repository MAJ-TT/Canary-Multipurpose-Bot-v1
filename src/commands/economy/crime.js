// Import required modules
const Discord = require("discord.js");

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
  // Get user and timeout variables
  let user = interaction.user;
  // timeout is calculated as 1000 milliseconds * 60 seconds * 60 minutes * 2 hours
  let timeout = 1000 * 60 * 60 * 2;



  // Check if user is on cooldown
  Schema2.findOne({ User: user.id }, async (err, dataTime) => {
    if (
      dataTime && 
      dataTime.Crime !== null &&
      timeout - (Date.now() - dataTime.Crime) > 0
    ) {
      // User is on cooldown, send error message
      let time = (dataTime.Crime / 1000 + timeout / 1000).toFixed(0);
      return client.errWait(
        {
          time: time,
          type: "editreply",
        },
        interaction
      );
    } else {
      // User not on cooldown
      
      // Get random crime
      let replies = [
        "Hacking",
        "Burglary",
        "Roberry",
        "Murder",
        "Dealing drugs",
        "Child abuse",
        "Arms trade",
        "Street robbery",
        "Human trafficking",
        "Money laundering",
        "Tax evasion",
        "Counterfeiting",
        "Embezzlement",
      ];

      let result = Math.floor(Math.random() * replies.length);
      
      // Get random success chance
      let result2 = Math.floor(Math.random() * 10);

      // Get random reward amount
      let amount = Math.floor(Math.random() * 10) + 1;

      // Get random coin loss amount
      const coinLoss = Math.floor(Math.random() * 7) + 1;

      // Check for success
      if (result2 > 7) {

        // Crime succeed embed
        client.embed(
          {
            title: `${client.emotes.normal.check}・Damn uou did a crime!`,
            fields: [
              {
                name: `🦹‍♂️ ┆ Crime`,
                value: `${replies[result]}`,
                inline: true,
              },
              {
                name: `${client.emotes.economy.coins} ┆ Earned`,
                value: `\$${amount}`,
                inline: true,
              },
            ],
            type: "editreply",
          },
          interaction
        );

        // Give reward
        client.addMoney(interaction, user, amount);

        // Update cooldown
        if (dataTime) {
          dataTime.Crime = Date.now();
          dataTime.save();
        } else {
          new Schema2({
            User: user.id,
            Crime: Date.now(),
          }).save();
        }
      } else {
        // Crime failed
        
        // Remove coins
        client.removeMoney(interaction, user, coinLoss);

        // Send failure embed
        client.embed(
          {
            title: `${client.emotes.normal.error}・You got caught!`,
            fields: [
              {
                name: `🦹‍♂️ ┆ Crime`,
                value: `${replies[result]}`,
                inline: true,
              },
              {
                name: `${client.emotes.economy.coins} ┆ Lost`,
                value: `\$${coinLoss}`,
                inline: true,
              },
            ],
            type: "editreply",
          },
          interaction
        );

        // Update cooldown
        if (dataTime) {
          dataTime.Crime = Date.now();
          dataTime.save();
        } else {
          new Schema2({
            User: user.id,
            Crime: Date.now(),
          }).save();
        }
      }
    }
  });
};
