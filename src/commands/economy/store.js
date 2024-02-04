const Discord = require('discord.js');
const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args, message) => {
  try {
    
    store.find({ Guild: interaction.guild.id }, async (err, storeData) => {
      // If the server has a store, send their embed
      if (storeData && storeData.length > 0) {
        const lb = storeData.map(e => `**${e.Item}** - ${client.emotes.economy.coins} \`$${e.Amount}\``);
        await client.createLeaderboard(`・${interaction.guild.name}'s Store`, lb, interaction);
      }

      // // Create and send your embeds
      // await client.embed({
      //   title: `${client.emotes.economy.coins}・Rewards`,
      //   desc: `
      //   **$5 Nitro**  ***=*** \`$250 Sea Credits\`  
      //   **$10 Nitro**  ***=*** \`$500 Sea Creadits\`
      //   **$5 Robux**    ***=*** \`$250 Sea Creadits\`
      //   **$10 Robux**    ***=*** \`$500 Sea Credits\`
        
      //   `, 
      // }, interaction.channel);
    });
  } catch (error) {
    console.error(error); // Log any errors
    await interaction.followUp({ content: 'An error occurred. Please try again later.' });
  }
};
