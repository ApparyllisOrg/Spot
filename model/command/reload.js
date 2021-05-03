const Logger = require('@lilywonhalf/pretty-logger');
const CommandCategory = require('../command-category');
const CommandPermission = require('../command-permission');

class Reload
{
    static instance = null;

    constructor() {
        if (Reload.instance !== null) {
            return Reload.instance;
        }

        this.aliases = ['reboot'];
        this.category = CommandCategory.BOT_MANAGEMENT;
        this.isAllowedForContext = CommandPermission.isMemberMod;
        this.description = 'Reboots the bot';
    }

    /**
     * @param {Message} message
     */
    async process(message) {
        await message.reply(`OK, I'm rebooting now.`);
        Logger.notice('Reboot asked');
    }
}

module.exports = new Reload();
