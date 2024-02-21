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
        name: "🆔 ┆ ID",
        value: `${client.shard.ids[0] + 1}/${client.options.shardCount}`,
        inline: true,
      },
      { name: "📃 ┆ State", value: `Ready`, inline: true }
    )
    .setColor(client.config.colors.normal);
  startLogs.send({
    Username: "Bot Logs",
    embeds: [embed],
  });

  setInterval(async function () {
    const promises = [
      client.shard.fetchClientValues("guilds.cache.size"),
      client.shard.broadcastEval((client) =>
        client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
      ),
    ];

    return Promise.all(promises).then((results) => {
      // const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
      const totalMembers = results[1].reduce(
        (acc, memberCount) => acc + memberCount,
        0
      );
      const totalMembersFormatted = totalMembers.toLocaleString();

      // Status text options
      const statusTextOptions = [
        `/help for help`,
        // `${totalGuilds} servers`,
        `${totalMembersFormatted} members`,
        `discord.gg/Amused`,
        `discord.gg/Slumber`,
      ];

      const randomText =
        statusTextOptions[Math.floor(Math.random() * statusTextOptions.length)];

      // Set bot presence (streaming status, invite link)
      client.user.setPresence({
        activities: [
          {
            name: randomText,
            type: Discord.ActivityType.Streaming,
            url: "https://twitch.tv/discord", // Replace with your invite
          },
        ],
        status: "idle",
      });
    });
  }, 20000); // 20000 milliseconds = update every 20 seconds

  client.player.init(client.user.id);
};
