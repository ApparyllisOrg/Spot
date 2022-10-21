import CommandCategory from "../model/command-category";
import * as CommandPermission from '../model/command-permission';

import config from "../config";
import { APIMessage } from "discord-api-types/v10";
import { restClient } from "../bot";

const JAVASCRIPT_LOGO_URL = 'https://i.discord.fr/IEV8.png';

export default {
    aliases: ['eval'],
    category: CommandCategory.BOT_MANAGEMENT,
    isAllowedForContext: CommandPermission.isMommy,
    process: async (message: APIMessage) => {
        const code = message.content
            .substr(config.prefix.length + 'eval'.length)
            .trim()
            .replace(/(`{3})js\n(.+)\n\1/iu, '$2')
            .trim();

        console.log('Eval: ' + code);
        let output: string | null = null;

        try {
            output = eval(`${code}`); // Spoopy! 🎃 🦇 👻 ☠ 🕷
        } catch (exception) {
            // @ts-expect-error
            output = `**${exception.name}: ${exception.message}**\n${exception.stack}`;
        }

        restClient.createMessage(message.channel_id, { embed: {
            author: {
                name: 'Eval',
                iconUrl: JAVASCRIPT_LOGO_URL,
            },
            color: 0x00FF00,
            description: output!,
        }}).catch(error => console.warn(error.toString()));
    }
};
