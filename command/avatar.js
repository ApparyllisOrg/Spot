const Logger = require('@lilywonhalf/pretty-logger');
const Discord = require('discord.js');
const CommandCategory = require('../model/command-category');
const Guild = require('../model/guild');

module.exports = {
    aliases: ['av'],
    category: CommandCategory.FUN,
    isAllowedForContext: () => true,
    description: 'Displays the avatar of the specified member.',
    process: async (message, args) => {
        let user = null;

        if (args.length > 0) {
            const result = Guild.findDesignatedMemberInMessage(message);

            if (result.foundMembers.length > 0) {
                if (result.foundMembers[0].user !== undefined) {
                    user = result.foundMembers[0].user;
                } else {
                    user = result.foundMembers[0];
                }
            }
        } else {
            user = message.author;
        }

        if (user !== null) {
            const url = user.displayAvatarURL({ dynamic: true });

            message.channel.send(new Discord.MessageAttachment(
                url + '?size=2048',
                user.id + url.substr(url.lastIndexOf('.'))
            )).catch(error => Logger.warning(error.toString()));
        } else {
            message.reply('I... Have no idea who that could be, sorry.');
        }
    }
}
