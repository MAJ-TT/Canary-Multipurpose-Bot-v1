const Schema = require("../../database/models/profile");

module.exports = async (client, interaction, args) => {
  Schema.findOne({ User: interaction.user.id }, async (err, data) => {
    if (data) {
      Schema.findOneAndDelete({ User: interaction.user.id }).then(() => {
        client.succNormal(
          {
            text: "Your profile was deleted!",
            type: "editreply",
          },
          interaction
        );
      });
    } else {
      client.errNormal(
        {
          error: "No profile found!",
          type: "editreply",
        },
        interaction
      );
    }
  });
};
