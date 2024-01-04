const { Command } = require('discord-akairo');


class AutoplayCommand extends Command {
    constructor() {
        super('autoplay', {
            aliases: ['autoplay'],
            args: [
                {
                    id: 'state',
                    type: 'string',
                    default: 'off'
                }
            ]
        });
    }

    async exec(message, args) {
        const player = this.client.player.players.get(message.guild.id);
        if (!player) {
            return message.reply('No player is currently active.');
        }

        if (args.state === 'on') {
            player.autoplay = true;
            console.log('Autoplay has been enabled');
            return message.reply('Autoplay is now enabled.');
        } else if (args.state === 'off') {
            player.autoplay = false;
            console.log('Autoplay has been disabled');
            return message.reply('Autoplay is now disabled.');
        } else {
            return message.reply('Invalid argument. Use `autoplay on` or `autoplay off`.');
        }
    }
}

module.exports = AutoplayCommand;