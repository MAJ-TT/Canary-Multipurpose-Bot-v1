const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    try {
        console.log('24/7 command triggered');

        if (!interaction.member.voice.channel) {
            return client.errNormal({
                error: `You're not in a voice channel!`,
                type: 'editreply'
            }, interaction);
        }

        let channel = interaction.member.voice ? interaction.member.voice.channel : null;
        if (!channel) {
            return client.errNormal({
                error: `The channel does not exist!`,
                type: 'editreply'
            }, interaction);
        }

        let player = client.player.players.get(interaction.guild.id);
        console.log('Player fetched', player);

        if (!player) {
            console.log('Player does not exist, creating a new one');
            player = client.player.create({
                guild: interaction.guild.id,
                voiceChannel: channel.id,
                textChannel: interaction.channel.id,
            });
            console.log('New player created', player);
        }

        if (player && player.voiceChannel && (channel.id !== player.voiceChannel)) {
            return client.errNormal({
                error: `You are not in the same voice channel!`,
                type: 'editreply'
            }, interaction);
        }

        const subcommand = interaction.options.getSubcommand();
        console.log('Subcommand:', subcommand);

        // Defer the reply at the beginning
        await interaction.deferReply({ fetchReply: true });

        if (subcommand === 'enable') {
            console.log('Enabling 24/7 mode');
            player.set('24/7', true);
            console.log('24/7 mode enabled');
            await interaction.editReply('24/7 mode enabled. The bot will now stay in the voice channel even if there is no one there.');

            console.log('Attempting to join the voice channel');
            channel.join().then(connection => {
                console.log('Bot joined the voice channel');
            }).catch(error => {
                console.error('Error when joining the voice channel:', error);
            });
        } else if (subcommand === 'disable') {
            console.log('Disabling 24/7 mode');
            player.set('24/7', false);
            console.log('24/7 mode disabled');
            await interaction.editReply('24/7 mode disabled. The bot will now leave the voice channel when it is empty.');

            console.log('Attempting to leave the voice channel');
            channel.leave();
            console.log('Bot left the voice channel');
        } else {
            console.log('Invalid subcommand');
            await interaction.editReply(`Invalid subcommand. Please use 'enable' or 'disable'.`);
        }
    } catch (error) {
        console.error(`An error occurred in the 24/7 command: ${error}`);
        await interaction.editReply(`An error occurred while executing the command: ${error.message}`);
    }
};
