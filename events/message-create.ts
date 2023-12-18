import { Message } from "discord.js";
import handleMessage from "../messageHandler";
import search from "../model/jira";

export const onMessageCreate = async (msg: Message) => {

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
}