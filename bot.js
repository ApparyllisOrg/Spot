const Logger = require('@lilywonhalf/pretty-logger');

const { Client } = require('discord.js');
const Config = require('./config.json');
const Command = require('./model/command');
const fs = require('fs');

global.bot = new Client({ fetchAllMembers: true });
global.isRightGuild = (guildSnowflake) => guildSnowflake === Config.guild;

const crashRecover = (exception) => {
    Logger.exception(exception);
    Logger.notice('Need reboot');
};

process.on('uncaughtException', crashRecover);
bot.on('error', crashRecover);

Command.init();

const help = require("./command/help");
bot.ws.on('INTERACTION_CREATE', help.interactionHandler);

bot.on('ready', () => {
    fs.readdirSync('./event/')
        .filter(filename => filename.endsWith('.js'))
        .map(filename => filename.substr(0, filename.length - 3))
        .forEach(filename => {
            const event = filename.replace(/([_-][a-z])/gu, character => `${character.substr(1).toUpperCase()}`);

            if (filename !== 'ready') {
                bot.on(event, require(`./event/${filename}`));
            } else {
                require(`./event/${filename}`)();
            }
        });
});

Logger.info('--------');

Logger.info('Logging in...');
bot.login(Config.token);
