const Discord = require("discord.js");
const store = require("../../database/models/economyStore");
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

  if (!item)
    return client.errUsage(
      { usage: "deleteitem [item]", type: "editreply" },
      interaction
    );

  store.findOne(
    { Guild: interaction.guild.id, Item: item },
    async (err, storeData) => {
      if (storeData) {
        var remove = await store.deleteOne({
          Guild: interaction.guild.id,
          Item: item,
        });

        client.succNormal(
          {
            text: `The item was deleted from the store`,
            fields: [
              {
                name: ` ┆ Item`,
                value: `${item}`,
              },
            ],
            type: "editreply",
          },
          interaction
        );
      } else {
        client.errNormal(
          {
            error: `This item is not in the store!`,
            type: "editreply",
          },
          interaction
        );
      }
    }
  );
};
