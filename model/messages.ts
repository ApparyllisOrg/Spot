import { client } from "../bot";

interface Message {
    names: string[];
    description: string;
    title: string;
    text: string;
    friendlyName: string;
    category: string;
}

export const messages: Record<string, Message> = {};
let avatarUrl = "";

export const loadMessages = async () => {
    const messagesList = require('../messages.json')["faq"];
    messagesList.forEach((msg: any) => {
        messages[msg["title"]] = msg
    })

    const userInfo = await client.user;

    const avatar = userInfo?.avatarURL() ?? '';

    avatarUrl = avatar;
    console.log(avatarUrl);
}

export const get = (name: string) => messages[name];
export const getList = () => Object.keys(messages).map(msg => ({ name: messages[msg].names[0], value: messages[msg].description }));

export const getEmbed = (name: string) => {
    let foundMsg: Message | undefined;
    Object.keys(messages).forEach((msgKey) => {
        if (foundMsg) return;

        const msg = messages[msgKey]

        if (msg.names.includes(name)) {
            foundMsg = msg;
            return;
        }
    });

    if (foundMsg == null) return;

    return {
        color: 0xA95B44,
        author: {
            name: foundMsg.title,
            iconUrl: avatarUrl,
        },
        description: foundMsg.text,
    }
}
