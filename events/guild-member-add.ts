import { GuildMember, TextBasedChannel } from "discord.js";
import { client } from "../bot";
import config from "../config";

export const onGuildMemberAdd = async (member: GuildMember) => {
    const msg = `Welcome, <@${member.id}>! If you joined for any specific support questions `
        + `please check out <#863171642905591830> first to see if your issue is known, `
        + `and make sure that your app is up-to-date before posting.`;

    const channel: TextBasedChannel | null = await client.channels.fetch(config.channels.joins) as TextBasedChannel;
    channel?.send(msg);
}