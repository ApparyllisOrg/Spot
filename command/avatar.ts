import { APIGuildMember, APIUser, GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { restClient } from "../bot";
import CommandCategory from "../model/command-category";

export default {
    aliases: ['avatar', 'av'],
    category: CommandCategory.FUN,
    isAllowedForContext: (_: GatewayMessageCreateDispatchData) => true,
    description: 'Displays the avatar of the specified member.',
    process: async (message: GatewayMessageCreateDispatchData, args: string[]) => {
        let user: APIUser;

        if (message.mentions.length == 0)
            user = message.author;
            
        else if (message.mentions.length > 1)
            return restClient.createMessage(message.channel_id, `<@${message.author.id}>, there are too many mentions in this message! `
                                                                +`please pick only one user whose avatar you want to show.`);

        else user = message.mentions[0];

        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`;
        await restClient.createMessage(message.channel_id, { embed: { image: { url } } });
    }
}
