import axios from "axios";
import { ApplicationCommandType, CommandInteraction, ContextMenuCommandBuilder, ModalBuilder, ModalSubmitInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextBasedChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import { client } from "../../bot";
import config from "../../config";
import { frequencies, getJiraToken, severites } from "../../utils/jira";

const { ActionRowBuilder, } = require('discord.js');

const getPlaceholderFromList = (list: { label: string, value: string }[]) => {
    let placeholder: string = ''

    for (let i = 0; i < list.length; ++i) {
        placeholder += `${i + 1}=${list[i].label}\n`
    }

    return placeholder
}

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Create Bug')
        .setDefaultMemberPermissions(0)
        .setType(ApplicationCommandType.Message),
    async execute(interaction: CommandInteraction) {

        const modal = new ModalBuilder()
            .setCustomId('createBugModal')
            .setTitle('Create a new bug');

        const titleInput = new TextInputBuilder()
            .setCustomId('title')
            .setLabel("What should we call the bug?")
            .setRequired(true)
            .setMaxLength(200)
            .setStyle(TextInputStyle.Short);

        const descInput = new TextInputBuilder()
            .setCustomId('desc')
            .setLabel("Description/More info (Platform, beta, release, etc.)")
            .setRequired(false)
            .setMaxLength(1000)
            .setStyle(TextInputStyle.Paragraph);

        const frequencyInput = new TextInputBuilder()
            .setCustomId('frequency')
            .setLabel("How often does it happen?")
            .setMaxLength(1)
            .setMinLength(1)
            .setRequired(true)
            .setPlaceholder(getPlaceholderFromList(frequencies))
            .setStyle(TextInputStyle.Paragraph);

        const severityInput = new TextInputBuilder()
            .setCustomId('severity')
            .setLabel("How severe is the bug?")
            .setMaxLength(1)
            .setMinLength(1)
            .setRequired(true)
            .setPlaceholder(getPlaceholderFromList(severites))
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
        const secondActionRow = new ActionRowBuilder().addComponents(descInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(severityInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(frequencyInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

        await interaction.showModal(modal);

        const result = await interaction.awaitModalSubmit({
            time: 60000,
            filter: i => i.user.id === interaction.user.id,
        }).catch((e) => undefined)

        if (result == undefined) {
            return;
        }

        const title = result.fields.getTextInputValue('title')
        const frequency = result.fields.getTextInputValue('frequency')
        const severity = result.fields.getTextInputValue('severity')
        const descrption = result.fields.getTextInputValue('desc')

        if (Number.isNaN(Number.parseInt(severity))) {
            result.reply({ ephemeral: true, content: `You entered a non-number for severity. Please only submit a number as listed in the placeholder!` })
            return;
        }

        if (Number.isNaN(Number.parseInt(frequency))) {
            result.reply({ ephemeral: true, content: `You entered a non-number for frequency. Please only submit a number as listed in the placeholder!` })
            return;
        }

        if (interaction.isMessageContextMenuCommand()) {
            const messageUrl = interaction.targetMessage.url


            const url = `${config.jira.baseUrl}/issue`;
            const issuePayload = {
                fields: {
                    project: {
                        key: "SP"
                    },
                    summary: title,
                    description: `Issue submitted from Spot in reaction to: ${messageUrl}\n\n${descrption}`,
                    issuetype: {
                        id: "10005"
                    },
                    customfield_10057: {
                        id: severites[parseInt(severity) - 1].value
                    },
                    customfield_10056: {
                        id: frequencies[parseInt(frequency) - 1].value
                    }
                }
            }

            const serverResponse = await new axios.Axios({}).post(url, JSON.stringify(issuePayload), { headers: { "Authorization": getJiraToken(), "Content-Type": 'application/json' }, },).catch((e) => console.error(e))
            if (serverResponse && serverResponse.status == 201) {
                const responseData = JSON.parse(serverResponse.data)

                const channel = await client.channels.fetch(interaction.channelId) as TextBasedChannel
                channel.send({ reply: { messageReference: interaction.targetMessage }, content: `A bug report has been created for your issue under issue-ID ${responseData.key}!`, options: { flags: 'SuppressNotifications' } })

                result.reply({ ephemeral: true, content: 'Your submission succeeded.' })
            }
            else {
                console.log(serverResponse)
                result.reply({ ephemeral: true, content: 'Your submission failed. Something went wrong' })
            }
        }
        else {
            result.reply({ ephemeral: true, content: 'Unable to find message this bug belongs to' })
        }
    },
};
