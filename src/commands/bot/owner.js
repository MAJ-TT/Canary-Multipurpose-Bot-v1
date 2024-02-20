const Discord = require("discord.js");

module.exports = async (client, interaction, args) => {
  client.embed(
    {
      title: `📘・Owner information`,
      desc: `____________________________`,
      thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
      fields: [
        {
          name: "👑 ┆ Owner",
          value: `MAJ.TT \n.Slidex`,
          inline: true,
        },
        {
          name: "🏷 ┆ Mention",
          value: `<@543161769636528128> \n<@667536542159339561>`,
          inline: true,
        },
        {
          name: "🏢 ┆ Organization",
          value: `Sea Soft 🌊`,
          inline: true,
        },
        {
          name: "🌐 ┆ Invites",
          value: `[Amused](https://discord.gg/RwPzkm4Ddw) \n[Sea Soft](https://discord.gg/hcqh59wJkg)`,

          inline: true,
        },
      ],
      type: "editreply",
    },
    interaction
  );
};
