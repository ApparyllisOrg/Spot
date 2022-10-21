import { APIMessage, GatewayMessageCreateDispatchData } from 'discord-api-types/v10';

import CommandCategory from '../model/command-category';
import * as CommandPermission from '../model/command-permission';

import config from '../config';
import { restClient } from '../bot';

export default {
    aliases: ['clean', 'clear', 'purge'],
    category: CommandCategory.MODERATION,
    isAllowedForContext: CommandPermission.isMemberMod,
    description: 'Deletes messages in bulk.',
    process: async (message: GatewayMessageCreateDispatchData, args: string[]) => {
        if (args.length > 0 && parseInt(args[0]) > 0) {
            // sometimes abstractions are nice...
            // await message.channel.bulkDelete(Math.min(parseInt(args[0]) + 1, 100));

            const messages = await restClient.fetchMessages(message.channel_id, { limit: Math.min(parseInt(args[0]) + 1, 100) });
            restClient.bulkDeleteMessages(message.channel_id, messages.map((x: APIMessage) => x.id));
        } else {
            restClient.createMessage(message.channel_id, `You have to tell me how many messages I should clean. \`${config.prefix}clean 10\` for example.`);
        }
    }
}
