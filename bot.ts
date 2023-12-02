import { Client, GatewayIntentBits, GuildMember, Channel, TextBasedChannel, Events, Message, SlashCommandBuilder, Collection } from 'discord.js';
import * as dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs'

dotenv.config();

declare module "discord.js" {
    export interface Client {
        commands: Collection<any, any>;
    }
}

import config from "./config";

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

import handleMessage from './messageHandler';
import search from './model/jira';

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

    if (msg.content.startsWith(".cl ")) {
        const version = msg.content.substring(4)
        try {
            // Test if a number
            const versionNumber = Number(version)
            const issues = await search(version);

            const issueDataList: { title: string, key: string }[] = []

            issues.forEach((issue) => {
                issueDataList.push({ title: issue.fields.summary, key: issue.key })
            })

            const issueTextList: string[] = []

            issueDataList.forEach((issue) => {
                issueTextList.push(`[${issue.key}] ${issue.title}`)
            })

            let issueIndex = 0

            let messagesToSend: string[] = []

            let parsedAll = false
            while (!parsedAll) {
                let formattedMsg = ""

                let foundLength = 6
                for (let i = issueIndex; i < issueTextList.length + 1; ++i) {
                    if (i == issueTextList.length) {
                        parsedAll = true;
                        break;
                    }

                    const line = `${issueTextList[i]}\n`
                    if (foundLength + line.length > 1999) {
                        break;
                    }

                    formattedMsg += line
                    foundLength += line.length
                    issueIndex = i;
                }

                messagesToSend.push(`\`\`\`${formattedMsg}\`\`\``)
            }

            let index = 0
            messagesToSend.forEach((messageToSend) => {
                let waitMultiplier = index + 1
                let waitTime = 1000 * waitMultiplier
                setTimeout(() => {
                    msg.channel.send(messageToSend)
                }, waitTime);
                index++;
            })
        }
        catch (e) {
        }
    }
    else {
        await handleMessage(msg).catch(console.error);
    }
});

client.login(process.env.token);
