const Discord = require('discord.js');

module.exports = (client, player, track) => {
    // Check if 24/7 mode is enabled
    if (!player.get('24/7')) {
        player.destroy(player.guild.id);

        const channel = client.channels.cache.get(player.textChannel);
        client.errNormal({
            error: "Queue is empty, Leaving voice channel"
        }, channel)
    }
};
