const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner",
            value: `MAJ.TT \n.Slidex`,
            inline: true,
        },
        {
            name: "🏷┆Mention",
            value: `<@543161769636528128> \n<@667536542159339561>`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `Sea Soft 🌊`,
            inline: true,
        },
        {
            name: "🌐┆Invites",
            value: `[New Jin's](https://discord.gg/newjin) \n[Sea Soft](https://discord.gg/Seasoft)`,

            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 