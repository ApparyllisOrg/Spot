import CommandCategory from "../model/command-category";
import * as CommandPermission from '../model/command-permission';

import axios from "axios";
import { APIMessage, GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { restClient } from "../bot";

export default {
    aliases: ['ticket'],
    category: CommandCategory.MODERATION,
    isAllowedForContext: CommandPermission.isMemberModOrHelper,
    process: async (message: GatewayMessageCreateDispatchData, args: string[]) => {
        if (message.message_reference == null)
            return restClient.createMessage(message.channel_id, `<@${message.author.id}>, missing reply`);

        let reply: APIMessage = await restClient.fetchMessage(message.channel_id, message.message_reference.message_id!);

        let user = null;

        if (reply.webhook_id != null) {
            let pkmsg = await axios(`https://api.pluralkit.me/v2/messages/${reply.id}`);
            user = pkmsg.data.sender;
        } else {
            user = reply.author.id;
        }

        restClient.deleteMessage(message.channel_id, message.id).catch(() => {});
        restClient.createMessage(message.channel_id, {
            content: `<@${user}>: Please send us a support ticket for your specific issue using this link: <https://apparyllis.atlassian.net/servicedesk/customer/portal/3>\n`
                + `You can also click the button below this message.\n\n`
                + `Select the support type that best fits your issue. Make sure to fill out any information that is requested.\n\n`
                + `Once you fill out the ticket, you will receive an email with a confirmation.\nWhen the developer answers the ticket, you will get another email, `
                + `so please watch your email (and spam folder) for a reply.`,
            messageReference: { messageId: reply.id },
            components: [{ type: 1, components: [{ type: 2, style: 5, label: "Submit ticket", url: "https://apparyllis.atlassian.net/servicedesk/customer/portals" }]}]
        });
    }
};