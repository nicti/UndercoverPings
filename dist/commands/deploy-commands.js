"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv_flow_1 = require("dotenv-flow");
(0, dotenv_flow_1.config)();
var rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
var commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName('ucping')
        .setDescription('Sends an undercover ping!')
        .addStringOption(function (option) { return option.setName('mention')
        .setDescription('Mention level of ping')
        .setRequired(true)
        .addChoices({ name: 'everyone', value: 'everyone' }, { name: 'here', value: 'here' }); })
        .addStringOption(function (option) { return option.setName('message')
        .setDescription('Message to send with ping')
        .setRequired(true); })
        .addNumberOption(function (option) { return option.setName('duration')
        .setDescription('Duration the ping should be available in minutes, default: 15 minutes'); })
];
rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.BOT_APPLICATION_ID, process.env.BOT_GUILD_ID), { body: commands })
    .then(function () { return console.log('Successfully registered application commands.'); })["catch"](console.error);
