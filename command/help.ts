import { restClient } from "../bot";
import CommandCategory from "../model/command-category";
import * as CommandPermission from '../model/command-permission';
import * as types from 'discord-api-types/v10';

import { Command, commands } from "../messageHandler";
import * as messages from "../model/messages";
import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

const cleanString = (str: string | null | undefined) => (str === null || str === undefined) ? undefined : str
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const mainPage = (id: string) => {
    const buttons = Object.values(CommandCategory).filter(x => typeof x === 'string').map(c => ({
        type: 2,
        style: 1,
        label: cleanString(c),
        customId: `help-${id}-${c}`,
    }))

    return {
        embeds: [{
            title: 'Help command',
            color: 0xA95B44,
            description:
                'Spot stands for **S**imply **P**lural b**ot**. This bot is mainly used to generate changelogs and help ' +
                'with the definition of features, so recurring questions can be answered more quickly.\n' +
                '\n' +
                'Commands are classified by categories because displaying every command in this small box would be ' +
                'confusing and would break Discord\'s character limit. Click on a buttom below to show the commands ' +
                'available in the corresponding category, or type `.help <category name>`.\n'
        }],
        components: [{
            'type': 1,
            'components': buttons,
        }]
    }

}

const categoryPage = (cat: string, id: string, direct = false) => {
    const c = Object.values(CommandCategory).filter(x => typeof x === 'string').map(x => cleanString(x)?.toLowerCase());
    if (!c.includes(cat.toLowerCase()))
        return;

    let data = {
        embeds: [{
            title: `Help command | ${cleanString(cat)}`,
            color: 0xA95B44,
        }],
        components: [{
            'type': 1,
            'components': [{
                type: 2,
                style: 2,
                label: 'Back',
                customId: `help-${id}-home`,
            }],
        }],
    };

    // @ts-expect-error
    if (direct) delete data.components;

    if (cat == CommandCategory.RESOURCE)
        // @ts-expect-error
        data.embeds[0].fields = messages.getList();
    else
        // @ts-expect-error
        data.embeds[0].fields = commands.map((cmd: Command) => {
            if (cmd.category !== cat) return;
            return { name: cmd.aliases[0], value: cmd.description ?? 'No description.'};
        }).filter(x => x);

    return data;
}

export default {
    aliases: ['help', "commands", 'h'],
    category: CommandCategory.INFO,
    isAllowedForContext: (_: GatewayMessageCreateDispatchData) => true,
    description: 'Provides the list of commands.',
    process: async (message: GatewayMessageCreateDispatchData, args: string[]) => {
        if (!args[0])
            await restClient.createMessage(message.channel_id, mainPage(message.author.id) );
        else
            await restClient.createMessage(message.channel_id, categoryPage(args.join(' '), message.author.id, true)
            ?? {
                content: 'Category not found.',
                messageReference: { messageId: message.id, guildId: message.guild_id },
                allowedMentions: { parse: [] },
            })
    },    
    interactionHandler: async (event: types.APIMessageComponentInteraction) => {
        const user = event.member ? event.member.user.id : event.user!.id;
        const customId = event.data.custom_id;
    
        let ret;
    
        if (!customId.startsWith(`help-${user}`)) {
            ret = {
                type: 4,
                data: {
                    flags: 64,
                    content: 'This help command was sent by someone else. Please run `.help` again.',
                },
            }
        } else if (customId.endsWith('home')) {
            ret = { type: 7, data: mainPage(user) };
        } else {
            let page = categoryPage(cleanString(customId.split(`help-${user}-`).join(''))!, user);
    
            if (page) {
                ret = { type: 7, data: page };
            } else {
                ret = { type: 4, data: { flags: 64, content: 'Category not found.' }}
            }
        }
    
        return await restClient.createInteractionResponse(event.id, event.token, ret);
    }
};
