const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

const BadgeModel = require('../../database/models/badge');

module.exports = async (client, interaction, args) => {

  const isDeveloper = await BadgeModel.findOne({
    User: interaction.user.id, 
    FLAGS: 'DEVELOPER'
  });

  if (!isDeveloper) {
    return client.errNormal({
      error: 'You do not have permission to use this command!',
      type: 'editreply'
    }, interaction);
  }

  const user = interaction.options.getUser('user');
  let amount = interaction.options.getNumber('amount');

  if (!user || !amount) return client.errUsage({ usage: "addmoney [user] [amount]", type: 'editreply' }, interaction);

  if (isNaN(amount)) return client.errNormal({ error: "Enter a valid number!", type: 'editreply' }, interaction);

  if (user.bot) return client.errNormal({
    error: "You cannot add money to a bot!",
    type: 'editreply'
  }, interaction);

  client.addMoney(interaction, user, parseInt(amount));

  setTimeout(() => {
    Schema.findOne({ User: user.id }, async (err, data) => {
      if (err) {
        console.error(err);
        return client.errNormal({
          error: 'An error occurred!',
          type: 'editreply'  
        }, interaction);
      }
      
      if (!data) {
        // User has no money, create a new entry
        data = new Schema({
          Guild: interaction.guild.id,
          User: user.id,
          Money: amount
        });
        await data.save(); 
      }

        client.succNormal({
        text: `Added ${amount} coins`,
        fields: [
            {
            name: `👤┆User`,
            value: `<@!${user.id}>`,
            inline: true
            },
            {
            name: `${client.emotes.economy.coins}┆Amount`,  
            value: `\$${amount}`,
            inline: true
            }
        ],
        type: 'editreply'
        }, interaction);

    }, 500)
  })

}
