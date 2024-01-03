const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    try {
        console.log('24/7 command triggered'); // This will print when the command is used

        // Check if the user is in a voice channel
        if (!interaction.member.voice.channel) {
            console.log('User is not in a voice channel'); // This will print if the user is not in a voice channel
            return client.errNormal({
                error: `You're not in a voice channel!`,
                type: 'editreply'
            }, interaction);
        }

        // Get the voice channel
        let channel = interaction.member.voice ? interaction.member.voice.channel : null;
        if (!channel) {
            console.log('Channel does not exist'); // This will print if the channel does not exist
            return client.errNormal({
                error: `The channel does not exist!`,
                type: 'editreply'
            }, interaction);
        }

        // Get the player
        let player = client.player.players.get(interaction.guild.id);
        console.log('Player fetched', player); // This will print the player object

        // If the player doesn't exist, create a new one
        if (!player) {
            console.log('Player does not exist, creating a new one'); // This will print if the player does not exist
            player = client.player.create({
                guild: interaction.guild.id,
                voiceChannel: channel.id,
                textChannel: interaction.channel.id,
            });
            console.log('New player created', player); // This will print the new player object
        }

        // Check if the player is in the same voice channel
        if (player && player.voiceChannel && (channel.id !== player.voiceChannel)) {
            console.log('User is not in the same voice channel as the bot'); // This will print if the user is not in the same voice channel as the bot
            return client.errNormal({
                error: `You are not in the same voice channel!`,
                type: 'editreply'
            }, interaction);
        }

        // Check the subcommand
        const subcommand = interaction.options.getSubcommand();
        console.log('Subcommand:', subcommand); // This will print the subcommand
        if(subcommand === 'enable') {
            // Enable 24/7 mode
            console.log('Enabling 24/7 mode'); // This will print when enabling 24/7 mode
            player.set('24/7', true);
            console.log('24/7 mode enabled'); // This will print after enabling 24/7 mode
            interaction.reply('24/7 mode enabled. The bot will now stay in the voice channel even if there is no one there.');

            // Join the voice channel
            console.log('Attempting to join the voice channel'); // This will print before the bot attempts to join the voice channel
            channel.join().then(connection => {
                console.log('Bot joined the voice channel'); // This will print after the bot joins the voice channel
            }).catch(error => {
                console.error('Error when joining the voice channel:', error); // This will print if there's an error when joining the voice channel
            });
        } else if(subcommand === 'disable') {
            // Disable 24/7 mode
            console.log('Disabling 24/7 mode'); // This will print when disabling 24/7 mode
            player.set('24/7', false);
            console.log('24/7 mode disabled'); // This will print after disabling 24/7 mode
            interaction.reply('24/7 mode disabled. The bot will now leave the voice channel when it is empty.');

            // Leave the voice channel
            console.log('Attempting to leave the voice channel'); // This will print before the bot attempts to leave the voice channel
            channel.leave();
            console.log('Bot left the voice channel'); // This will print after the bot leaves the voice channel
        } else {
            console.log('Invalid subcommand'); // This will print if the subcommand is not 'enable' or 'disable'
            interaction.reply(`Invalid subcommand. Please use 'enable' or 'disable'.`);
            return; // Stop the execution of the command
        }

    } catch (error) {
        console.error(`An error occurred in the 24/7 command: ${error}`);
        interaction.reply(`An error occurred while executing the command: ${error.message}`);
    }
};
a