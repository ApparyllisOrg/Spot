import { Client, GatewayIntentBits, Collection, ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';
import * as dotenv from 'dotenv';
import { deployCommands } from './deploy-commands';
import { bindCommands } from './bind-commands';
import { bindToEvents } from './utils/bind-events';
import { loadMessages } from './model/messages';

dotenv.config();

declare module "discord.js" {
    export interface Client {
        commands: Collection<any, any>;
    }
}

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

const init = async () => {
    await deployCommands();
    await bindCommands();

    client.login(process.env.token);

    bindToEvents();
    loadMessages();
}

init();