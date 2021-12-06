const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');

const axios = require('axios');

module.exports = {
    aliases: [],
    category: CommandCategory.MODERATION,
    isAllowedForContext: CommandPermission.isMemberModOrHelper,
    process: async (message) => {
        if (message.reference == null)
            return message.reply("missing reply");

        let reply = await message.channel.messages.fetch(message.reference.messageID);

        let user = null;

        if (reply.webhookID != null) {
            let pkmsg = await axios(`https://api.pluralkit.me/v2/messages/${reply.id}`);
            user = pkmsg.data.sender;
        } else {
            user = reply.author.id;
        }

        message.delete();
        message.client.api.channels(message.channel.id).messages.post({ data: {
            content: `<@${user}>: Please send us a support ticket for your specific issue using this link: <https://apparyllis.atlassian.net/servicedesk/customer/portal/3>\n`
                + `You can also click the button below this message.\n\n`
                + `Select the support type that best fits your issue. Make sure to fill out any information that is requested.\n\n`
                + `Once you fill out the ticket, you will receive an email with a confirmation.\nWhen the developer answers the ticket, you will get another email, `
                + `so please watch your email (and spam folder) for a reply.`,
            message_reference: { message_id: reply.id },
            components: [{ type: 1, components: [{ type: 2, style: 5, label: "Submit ticket", url: "https://apparyllis.atlassian.net/servicedesk/customer/portals" }]}]
        }});
    }
};