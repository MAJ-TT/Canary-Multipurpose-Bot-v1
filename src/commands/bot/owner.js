const Discord = require("discord.js");

module.exports = async (client, interaction, args) => {
  client.embed(
    {
      title: `📘・Owner information`,
      desc: `____________________________`,
      thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
      fields: [
        {
          name: "👑┆Owner",
          value: `S.S.R \nMAJ.TT`,
          inline: true,
        },
        {
          name: "🏷┆Mention",
          value: `<@1146756235610300477> \n<@543161769636528128>`,
          inline: true,
        },
        {
          name: "🏢┆Organization",
          value: `Xeno Goku Black 🌊`,
          inline: true,
        },
        {
          name: "🌐┆Invites",
          value: `[New Jin's](https://discord.gg/newjin) \n[Xeno Goku Black](https://discord.gg/dDg8Gnzx)`,

          inline: true,
        },
      ],
      type: "editreply",
    },
    interaction,
  );
};
