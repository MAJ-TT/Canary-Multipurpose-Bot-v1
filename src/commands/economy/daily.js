const Discord = require("discord.js");

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
  let user = interaction.user;
  let timeout = 1000 * 60 * 60 * 24;

  let amount = 10;

  Schema2.findOne({ User: user.id }, async (err, dataTime) => {
    if (
      dataTime &&
      dataTime.Daily !== null &&
      timeout - (Date.now() - dataTime.Daily) > 0
    ) {
      let time = (dataTime.Daily / 1000 + timeout / 1000).toFixed(0);
      return client.errWait(
        {
          time: time,
          type: "editreply",
        },
        interaction
      );
    } else {
      client.succNormal(
        {
          text: `You've collected your daily reward!`,
          fields: [
            {
              name: `${client.emotes.economy.coins} ┆ Amount`,
              value: `$${amount}`,
              inline: true,
            },
          ],
          type: "editreply",
        },
        interaction
      );

      if (dataTime) {
        dataTime.Daily = Date.now();
        dataTime.save();
      } else {
        new Schema2({
          User: user.id,
          Daily: Date.now(),
        }).save();
      }

      client.addMoney(interaction, user, amount);
    }
  });
};
