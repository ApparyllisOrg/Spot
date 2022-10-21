import { GatewayMessageCreateDispatchData } from 'discord-api-types/v10';

import CommandCategory from '../model/command-category';
import * as CommandPermission from '../model/command-permission';

import config from '../config';
import { restClient } from '../bot';

import search from '../model/jira';

const MAX_CHARACTERS = 1950;

export default {
    aliases:  ['changelog', 'change-log', 'cl'],
    category: CommandCategory.MODERATION,
    isAllowedForContext: CommandPermission.isMemberMod,
    description: 'Builds the changelog for a given version',
    process: async (message: GatewayMessageCreateDispatchData, args: string[]) => {
        const errorHandler = async (error: any) => {
            await restClient.deleteReactions(message.channel_id, message.id);
            await restClient.createReaction(message.channel_id, message.id, '❌');

            throw error;
        }
        
        await restClient.createReaction(message.channel_id, message.id, '⏳').catch(() => {});
        const issues = args.length > 0 && args[0] ? await search(args[0]).catch(errorHandler) : await search().catch(errorHandler);

        const taskType = config.jira.issueTypes.task;
        const bugType = config.jira.issueTypes.bug;
        const features = issues?.filter(issue => parseInt(issue.fields.issuetype.id) === taskType) ?? [];
        const bugs = issues?.filter(issue => parseInt(issue.fields.issuetype.id) === bugType) ?? [];

        if (features.length < 1 && bugs.length < 1) {
            await restClient.createMessage(message.channel_id, 'No issues found.');
            await restClient.deleteReactions(message.channel_id, message.id);

            return;
        }

        const output = `${features.map(
            issue => `* Feature: ${issue.key} - ${issue.fields.summary}`
        ).join('\n')}\n\n${bugs.map(
            issue => `* Fixed: ${issue.key} - ${issue.fields.summary}`
        ).join('\n')}`.trim();
        const messages: string[] = [];
        let currentMessage = '```';

        for (let line of output.split('\n')) {
            if (currentMessage.length + line.length >= MAX_CHARACTERS) {
                messages.push(`${currentMessage}\`\`\``);
                currentMessage = '```';
            }

            currentMessage = `${currentMessage}\n${line}`;
        }

        messages.push(`${currentMessage}\`\`\``);

        for (let messageToSend of messages) {
            await restClient.createMessage(message.channel_id, messageToSend);
        }

        await restClient.deleteReactions(message.channel_id, message.id).catch(() => {});
        await restClient.createReaction(message.channel_id, message.id, '✔');
    }
}
