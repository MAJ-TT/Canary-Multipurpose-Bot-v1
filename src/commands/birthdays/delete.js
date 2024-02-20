const Discord = require("discord.js");

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
  Schema.findOne({ User: interaction.user.id }, async (err, data) => {
    if (!data)
      return client.errNormal(
        {
          error: "No birthday found!",
          type: "editreply",
        },
        interaction
      );

    Schema.findOneAndDelete({ User: interaction.user.id }).then(() => {
      client.succNormal(
        {
          text: "Deleted your birthday",
          type: "editreply",
        },
        interaction
      );
    });
  });
};
