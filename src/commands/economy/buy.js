const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const store = require("../../database/models/economyStore");
const items = require("../../database/models/economyItems");

module.exports = async (client, interaction, args) => {
  // No longer require a shop to be set up, but handle potential errors gracefully
  const storeData = await store.find({ Guild: interaction.guild.id });
  if (storeData.length === 0) {
    console.warn(`No shop found in server '${interaction.guild.name}', creating a basic one...`);
    const defaultStoreItems = [
      { Item: '$5 Nitro', Amount: 250 },
      { Item: '$10 Nitro', Amount: 400 },
      { Item: '$5 Robux', Amount: 250 },
      { Item: '$10 Robux', Amount: 400 },
    ];
    await Promise.all(defaultStoreItems.map(item => new store({ ...item, Guild: interaction.guild.id }).save()));
    storeData = await store.find({ Guild: interaction.guild.id });
  }

  let labels = [];

  storeData.forEach(d => {
    labels.push({ label: d.Item, value: d.Item }); // Use item name directly
  });

  const select = await client.generateSelect(`economyBuy`, labels);

  client.embed({
    title: `・${interaction.guild.name}'s Store`,
    desc: `Choose an item from the menu to buy (or 'exit' to cancel)`,
    components: [select],
    type: 'editreply'
  }, interaction);

  const filter = i => {
    return i.user.id === interaction.user.id;
  };

  interaction.channel.awaitMessageComponent({ filter, componentType: Discord.ComponentType.StringSelect, time: 60000 }).then(async i => {
    const itemName = i.values[0];
    const buyPerson = i.guild.members.cache.get(i.user.id);

    if (itemName === 'exit') {
      return client.succNormal({
        text: `Purchase cancelled.`,
        components: [],
        type: 'update'
      }, i);
    }

    const data = await Schema.findOne({ Guild: i.guild.id, User: i.user.id });
    if (!data) {
      // Create a new user entry if it doesn't exist
      data = new Schema({ Guild: i.guild.id, User: i.user.id, Money: 0 });
      await data.save();
    }

    const checkStore = await store.findOne({ Guild: i.guild.id, Item: itemName });
    if (!checkStore) {
      return client.errNormal({
        error: `Item '${itemName}' not found in the store.`,
        components: [],
        type: 'update'
      }, i);
    }

    if (parseInt(checkStore.Amount) > parseInt(data.Money)) {
      return client.errNormal({
        error: `You don't have enough money to buy ${itemName}!`,
        components: [],
        type: 'update'
      }, i);
    }

    client.removeMoney(i, i.user, parseInt(checkStore.Amount));

    // Handle item delivery logic here (e.g., update inventory, send a message, etc.)
    // Placeholders for now, assuming successful delivery:
    await items.updateOne({ Guild: i.guild.id, User: i.user.id }, { $set: { [itemName]: true } }, { upsert: true }); // Add/update item in user inventory
    client.succNormal({
      text: `Congratulations! You successfully purchased ${itemName}.`,
      components: [],
      type: 'update'
    }, i);
  });
};
