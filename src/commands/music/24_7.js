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

        let channel = interaction.member.voice.channel;
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

        try {
            const subcommand = args[0]; // Get the subcommand from the arguments
            if (subcommand === 'enable') {
                console.log('Enabling 24/7 mode');
                player.set('24/7', true);
                console.log('24/7 mode enabled');
                await interaction.deferReply({ fetchReply: true });
                await interaction.editReply('24/7 mode enabled. The bot will now stay in the voice channel even when it is empty.');

                console.log('Attempting to join the voice channel');
                channel.join().then(connection => {
                    console.log('Bot joined the voice channel');
                }).catch(error => {
                    console.error('Error when joining the voice channel:', error);
                });
            }
            else if (subcommand === 'disable') {
                console.log('Disabling 24/7 mode');
                player.set('24/7', false);
                console.log('24/7 mode disabled');
                await interaction.deferReply({ fetchReply: true });
                await interaction.editReply('24/7 mode disabled. The bot will now leave the voice channel when it is empty.');

                console.log('Attempting to leave the voice channel');
                channel.leave();
                console.log('Bot left the voice channel');
            } else {
                console.log('Invalid subcommand');
                await interaction.deferReply({ fetchReply: true });
                await interaction.editReply(`Invalid subcommand. Please use 'enable' or 'disable'.`);
            }
        } catch (error) {
            console.error(`An error occurred in the 24/7 command: ${error}`);
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply(`An error occurred while executing the command: ${error.message}`);
            } else {
                await interaction.reply(`An error occurred while executing the command: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
