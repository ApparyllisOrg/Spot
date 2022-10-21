import * as types from 'discord-api-types/v10';
import CommandCategory from './model/command-category';
import { restClient } from './bot';
import config from './config';

import avatar from './command/avatar';
import changelog from './command/changelog';
import clean from './command/clean';
import eval from './command/eval';
import help from './command/help';
import ticket from './command/ticket';

import * as customMessages from './model/messages';

export interface Command {
    aliases: string[];
    category: CommandCategory;
    isAllowedForContext(_: types.GatewayMessageCreateDispatchData): boolean;
    description?: string;
    process(_: types.GatewayMessageCreateDispatchData, __: string[]): Promise<void>;
}

const privCommands: Record<string, Command> = {};

export const commands = [avatar, changelog, clean, eval, help, ticket];


commands.map((x: Command) => {
        x.aliases.map(a => privCommands[a] = x);
    });

export default async function handleMessage(message: types.GatewayMessageCreateDispatchData) {
    if (!message.content.toLowerCase().startsWith(config.prefix))
    return false;

    let args = message.content.substr(config.prefix.length).trim().split(' ');
    const calledCommand = args.shift()!.toLowerCase();

    const embed = customMessages.getEmbed(calledCommand);
    if (embed != null)
        return await restClient.createMessage(message.channel_id, { embed });

    const foundCommand = privCommands[calledCommand];
    if (foundCommand == null || !foundCommand.isAllowedForContext(message)) return;
    await foundCommand.process(message, args);
}