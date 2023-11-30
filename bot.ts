import { Client, GatewayIntentBits, GuildMember, Channel, TextBasedChannel, Events, Message, SlashCommandBuilder, Collection } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

import config from "./config";

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

import handleMessage from './messageHandler';

client.on("ready", () => {
    console.log("successfully logged in");
});

client.on("guildMemberAdd", async (member: GuildMember) => {
    const msg = `Welcome, <@${member.id}>! If you joined for any specific support questions `
        + `please check out <#863171642905591830> first to see if your issue is known, `
        + `and make sure that your app is up-to-date before posting.`;

    const channel: TextBasedChannel | null = await client.channels.fetch(config.channels.joins) as TextBasedChannel;
    channel?.send(msg);
});


client.on(Events.MessageCreate, async (msg: Message) => {
    await handleMessage(msg).catch(console.error);
});

client.login(process.env.token);
