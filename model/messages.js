const fs = require("fs")
const path = require('path');

const messages = {};

const load = () => 
{
    const messagesFile = fs.readFileSync(path.join(__dirname, '..', 'messages.json'))
    const messagesJson = JSON.parse(messagesFile);

    const messagesList = messagesJson["faq"];

    messagesList.forEach((msg) => {
        messages[msg["title"]] = msg
    })
}

load();

// interface Message {
//     names string[];
//     description string;
//     title string;
//     text string;
//     friendlyName string;
//     category string;
// }

module.exports = {
    get names() {
        return names;
    },
    get messages() {
        return messages;
    },
    get: (name) => messages[name],
    getList: () => Object.keys(messages).map(msg => ({ name: messages[msg].names[0], value: messages[msg].description })),
    getEmbed: (name) => {
        
        let foundMsg = null
        Object.keys(messages).forEach((msgKey) => 
        {
            if (foundMsg) return;

            const msg = messages[msgKey]

            if (msg.names.includes(name))
            {
                foundMsg = msg;
                return;
            }
        });

        if (!foundMsg) return;

        return {
            color: "A95B44",
            author: {
                name: foundMsg.title,
                iconURL: bot.user.displayAvatarURL({ dynamic: true }),
            },
            description: foundMsg.text,
        }
    }
}
