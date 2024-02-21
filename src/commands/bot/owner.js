const Discord = require("discord.js");

module.exports = async (client, interaction, args) => {
  client.embed(
    {
      title: `📘・Owner Information`,
      desc: `____________________________`,
      thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
      fields: [
        {
          name: "👑 ┆ Owner",
          value: `MAJ.TT \n.Support`,
          inline: true,
        },
        {
          name: "🏷 ┆ Mention",
          value: `<@543161769636528128> \n<@627503122683658250>`,
          inline: true,
        },
        {
          name: "🏢 ┆ Organization",
          value: `Slumber 🌊`,
          inline: true,
        },
        {
          name: "🌐 ┆ Invites",
          value: `[Amused](https://discord.gg/RwPzkm4Ddw) \n[Slumber](https://discord.gg/uuXhAbNzWw)`,

          inline: true,
        },
      ],
      type: "editreply",
    },
    interaction
  );
};
