const Discord = require("discord.js");

const Schema = require("../../database/models/economy");

const dev = require('../../dev');

module.exports = async (client, interaction, args) => {
  const badges = await dev.getBadges(interaction.user.id);

  if (!badges.includes('DEVELOPER')) {
    return client.errNormal({
      error: 'You do not have permission to use this command'
    }); 
  }


  const user = interaction.options.getUser("user");
  let amount = interaction.options.getNumber("amount");

  if (!user || !amount)
    return client.errUsage(
      { usage: "addmoney [user] [amount]", type: "editreply" },
      interaction
    );

  if (isNaN(amount))
    return client.errNormal(
      { error: "Enter a valid number!", type: "editreply" },
      interaction
    );

  if (user.bot)
    return client.errNormal(
      {
        error: "You cannot remove money from a bot!",
        type: "editreply",
      },
      interaction
    );

  client.removeMoney(interaction, user, parseInt(amount));

  setTimeout(() => {
    Schema.findOne(
      { User: user.id },
      async (err, data) => {
        if (data) {
          client.succNormal(
            {
              text: `Removed money from a user!`,
              fields: [
                {
                  name: `👤┆User`,
                  value: `<@!${user.id}>`,
                  inline: true,
                },
                {
                  name: `${client.emotes.economy.coins}┆Amount`,
                  value: `$${amount}`,
                  inline: true,
                },
              ],
              type: "editreply",
            },
            interaction
          );
        } else {
          client.errNormal(
            { error: `This user doesn't have any money!`, type: "editreply" },
            interaction
          );
        }
      },
      500
    );
  });
};
