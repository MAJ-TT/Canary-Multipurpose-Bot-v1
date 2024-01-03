const Discord = require('discord.js');

const Birthdays = require("../../database/models/birthdaychannels");
const Review = require("../../database/models/reviewChannels");
const Suggestion = require("../../database/models/suggestionChannels");
const StarBoard = require("../../database/models/starboardChannels");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');
    const channel = interaction.options.getChannel('channel');
    
    const choices = {
        birthdays : Birthdays,
        reviews : Review,
        suggestions : Suggestion,
        starboard : StarBoard
    };

    client.createChannelSetup(choices[choice], channel, interaction);
}

 
