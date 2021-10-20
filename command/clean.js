const Config = require('../config.json');
const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');

module.exports = {
    aliases: ['clear', 'purge'],
    category: CommandCategory.MODERATION,
    isAllowedForContext: CommandPermission.isMemberMod,
    description: 'Deletes messages in bulk.',
    process: async (message, args) => {
        if (args.length > 0 && parseInt(args[0]) > 0) {
            await message.channel.bulkDelete(Math.min(parseInt(args[0]) + 1, 100));
        } else {
            message.reply(`You have to tell me how many messages I should clean. \`${Config.prefix}clean 10\` for example.`);
        }
    }
}
