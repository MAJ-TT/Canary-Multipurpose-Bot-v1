const Discord = require("discord.js");
const chalk = require("chalk");
const { random } = require("mathjs");

module.exports = async (client) => {
  const startLogs = new Discord.WebhookClient({
    id: client.webhooks.startLogs.id,
    token: client.webhooks.startLogs.token,
  });

  console.log(`\u001b[0m`);
  console.log(
    chalk.blue(chalk.bold(`System`)),
    chalk.white(`>>`),
    chalk.red(`Shard #${client.shard.ids[0] + 1}`),
    chalk.green(`is ready!`)
  );
  console.log(
    chalk.blue(chalk.bold(`Bot`)),
    chalk.white(`>>`),
    chalk.green(`Started on`),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.green(`servers!`)
  );

  let embed = new Discord.EmbedBuilder()
    .setTitle(`🆙・Finishing shard`)
    .setDescription(`A shard just finished`)
    .addFields(
      {
        name: "🆔┆ID",
        value: `${client.shard.ids[0] + 1}/${client.options.shardCount}`,
        inline: true,
      },
      { name: "┆State", value: `Ready`, inline: true }
    )
    .setColor(client.config.colors.normal);
  startLogs.send({
    username: "Bot Logs",
    embeds: [embed],
  });

  setInterval(async function () {
    try {
      let totalGuilds; // Declare totalGuilds here
      if (client.guilds.cache.size !== totalGuilds) {
        return; // Wait for guilds to load fully
      }

      const promises = [client.shard.fetchClientValues("guilds.cache.size")];

      const results = await Promise.all(promises);
      totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
      let totalUsers = 0;

      // ... rest of your code
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  }, 20000);

  client.player.init(client.user.id);
};
