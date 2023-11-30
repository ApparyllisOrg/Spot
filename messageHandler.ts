import { client } from './bot';
import config from './config';
import * as customMessages from './model/messages';
import { Message, TextBasedChannel } from 'discord.js';


export default async function handleMessage(message: Message) {
    if (!message.content.toLowerCase().startsWith(config.prefix))
        return false;

    let args = message.content.substr(config.prefix.length).trim().split(' ');
    const calledCommand = args.shift()!.toLowerCase();

    const embed = customMessages.getEmbed(calledCommand);
    if (embed != null) {
        const channel: TextBasedChannel | null = await client.channels.cache.get(message.channelId) as TextBasedChannel
        channel.send({
            embeds: [{
                color: embed.color,
                title: embed.author.name,
                description: embed.description
            }]
        });
    }
}