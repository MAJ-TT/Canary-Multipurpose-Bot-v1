const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const itemSchema = require("../../database/models/economyItems");

module.exports = async (client) => {
    client.addMoney = async function (interaction, user, amount) {
        Schema.findOne({  User: user.id }, async (err, data) => {
            if (data) {
                data.Money += amount;
                data.save();
            }
            else {
                new Schema({
                     
                   User: user.id,
                    Money: amount,
                    Bank: 0
                }).save();
            }
        })
    }

    client.removeMoney = async function (interaction, user, amount) {
        Schema.findOne({  User: user.id }, async (err, data) => {
            if (data) {
                data.Money -= amount;
                data.save();
            }
            else {
                client.errNormal(`User has no ${client.emotes.economy.coins}!`, interaction.channel);
            }
        })
    }

    client.buyItem = async function (interaction, user, item) {
        const data = await itemSchema.findOne({  User: user.id });

        if (item == "FishingRod") {
            if (data) {
                data.FishingRod = true;
                data.save();
            }
            else {
                new itemSchema({
                     
                   User: user.id,
                    FishingRod: true,
                }).save();
            }
        }
    }
}