const Logger = require('@lilywonhalf/pretty-logger');
const Config = require('../config.json');
const CommandCategory = require('../model/command-category');
const CommandPermission = require('../model/command-permission');
const { search } = require('../model/jira');

const MAX_CHARACTERS = 1950;

module.exports = {
    aliases:  ['change-log', 'cl'],
    category: CommandCategory.MODERATION,
    isAllowedForContext: CommandPermission.isMemberMod,
    description: 'Builds the changelog for a given version',
    process: async (message, args) => {

        const errorHandler = async (error) => {
            if (error) {
                Logger.exception(error);
            }

            await message.reactions.removeAll();
            await message.react('❌');
        }

        await message.react('⏳').catch(() => {});
        const issues = args.length > 0 && args[0] ? await search(args[0]).catch(errorHandler) : await search().catch(errorHandler);

        const taskType = Config.jira.issueTypes.task;
        const bugType = Config.jira.issueTypes.bug;
        const features = issues.filter(issue => parseInt(issue.fields.issuetype.id) === taskType);
        const bugs = issues.filter(issue => parseInt(issue.fields.issuetype.id) === bugType);

        if (features.length < 1 && bugs.length < 1) {
            await message.channel.send('No issues found.');
            await message.reactions.removeAll().catch(() => {});

            return;
        }

        const output = `${features.map(
            issue => `* Feature: ${issue.key} - ${issue.fields.summary}`
        ).join('\n')}\n\n${bugs.map(
            issue => `* Fixed: ${issue.key} - ${issue.fields.summary}`
        ).join('\n')}`.trim();
        const messages = [];
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
            await message.channel.send(messageToSend).catch(() => {});
        }

        await message.reactions.removeAll().catch(() => {});
        await message.react('✔').catch(() => {});
    }
}
