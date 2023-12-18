
import axios from "axios";
import { CacheType, ChatInputCommandInteraction, Interaction, MessageContextMenuCommandInteraction, ModalSubmitInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { client } from "../bot";
import config from "../config";
import { frequencies, getJiraToken, severites } from "../utils/jira";

export const onInteractionCreate = async (interaction: Interaction) => {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
        onCommand(interaction);
    }
}

const onCommand = async (interaction: ChatInputCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType> | UserContextMenuCommandInteraction) => {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}
