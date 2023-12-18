import { Events } from "discord.js";
import { client } from "../bot";
import { onGuildMemberAdd } from "../events/guild-member-add";
import { onInteractionCreate } from "../events/interaction-create";
import { onMessageCreate } from "../events/message-create";
import { onReady } from "../events/ready";

export const bindToEvents = () => {
    client.on(Events.GuildMemberAdd, onGuildMemberAdd);
    client.on(Events.MessageCreate, onMessageCreate);
    client.on(Events.ClientReady, onReady);
    client.on(Events.InteractionCreate, onInteractionCreate)
}
