import * as dotenv from 'dotenv';
dotenv.config();

import config from "./config";

import { Socket } from 'detritus-client-socket/lib/gateway';
import { Client } from "detritus-client-rest";

import * as types from 'discord-api-types/v10';

const socket = new Socket(process.env.token!, { intents: 33283 });
export const restClient = new Client(process.env.token);

import handleMessage from './messageHandler';
import help from './command/help';

socket.on('packet', async (evt: types.GatewayDispatchPayload) => handleEvtInner(evt).catch(e => console.error(e, JSON.stringify(e, null, 2))));

async function handleEvtInner(evt: types.GatewayDispatchPayload) {
    if (evt.op != 0) return;
    if (evt.t == 'READY') {
        console.log("successfully logged in:", evt.d.user);
    }

    // i am quite sure this is the correct type
    // @ts-expect-error
    if (evt.t == 'INTERACTION_CREATE') await help.interactionHandler(evt.d);

    if (evt.t == 'GUILD_MEMBER_ADD') {
        if (evt.d.guild_id != config.guild) return;
        if (evt.d.user!.bot) return;
    
        const msg = `Welcome, <@${evt.d.user!.id}>! If you joined for any specific support questions `
                  + `please check out <#863171642905591830> first to see if your issue is known, `
                  + `and make sure that your app is up-to-date before posting.`;
        await restClient.createMessage(config.channels.joins, { content: msg });
    }

    if (evt.t == 'MESSAGE_CREATE') {
        if (evt.d.guild_id != config.guild) return;
        if (evt.d.author.bot) return;
        await handleMessage(evt.d).catch(console.error);
    }
};


console.log('Logging in...');
socket.connect("https://gateway.discord.gg");