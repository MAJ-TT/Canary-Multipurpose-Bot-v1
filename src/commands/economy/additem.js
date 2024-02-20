const Discord = require("discord.js");

const store = require("../../database/models/economyStore");

const { String } = require("discord.js");

const BadgeModel = require("../../database/models/badge");

module.exports = async (client, interaction, args) => {
  const isDeveloper = await BadgeModel.findOne({
    User: interaction.user.id,
    FLAGS: "DEVELOPER",
  });

  if (!isDeveloper) {
    return client.errNormal(
      {
        error: "You do not have permission to use this command!",
        type: "editreply",
      },
      interaction
    );
  }

  const item = interaction.options.getString("item"); // Get the item name
  let amount = interaction.options.getNumber("amount");

  if (!item || !amount)
    return client.errUsage(
      { usage: "additem [item] [amount]", type: "editreply" },
      interaction
    );

  if (isNaN(amount))
    return client.errNormal(
      { error: "Enter a valid number!", type: "editreply" },
      interaction
    );

  store.findOne(
    { Guild: interaction.guild.id, Item: item },
    async (err, storeData) => {
      // Check for existing item
      if (storeData) {
        client.errNormal(
          { error: `This item is already in the store!`, type: "editreply" },
          interaction
        );
      } else {
        new store({
          Guild: interaction.guild.id,
          Item: item, // Store the item name
          Amount: amount,
        }).save();

        client.succNormal(
          {
            text: `The item was added to the store!`,
            fields: [
              {
                name: ` ┆ Item`,
                value: item, // Display the item name
                inline: true,
              },
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
      }
    }
  );
};
