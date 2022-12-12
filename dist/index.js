"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv_flow_1 = require("dotenv-flow");
(0, dotenv_flow_1.config)();
var client = new discord_js_1.Client({ intents: [discord_js_1.IntentsBitField.Flags.Guilds] });
client.on('ready', function () {
    var _a;
    console.log("Logged in as ".concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag, "!"));
});
client.on('interactionCreate', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var mention_1, messageText_1, pingDuration_1, row_1;
    var _a, _b;
    return __generator(this, function (_c) {
        if (!interaction.isCommand())
            return [2 /*return*/];
        if (interaction.commandName === 'ucping') {
            mention_1 = (_a = interaction.options.get('mention')) === null || _a === void 0 ? void 0 : _a.value;
            messageText_1 = (_b = interaction.options.get('message')) === null || _b === void 0 ? void 0 : _b.value;
            pingDuration_1 = 15;
            if (interaction.options.get('duration')) {
                pingDuration_1 = interaction.options.get('duration').value;
            }
            row_1 = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId('primary')
                .setLabel('Click me to see ping!')
                .setStyle(discord_js_1.ButtonStyle.Primary));
            interaction.client.channels.fetch(interaction.channelId).then(function (channel) {
                channel.send({ content: "@".concat(mention_1), components: [row_1] }).then(function (message) {
                    var collector = message.createMessageComponentCollector({
                        componentType: discord_js_1.ComponentType.Button,
                        time: 1000 * 60 * pingDuration_1
                    });
                    collector.on('collect', function (i) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            i.reply({ content: "".concat(messageText_1), ephemeral: true });
                            return [2 /*return*/];
                        });
                    }); });
                    interaction.reply({ content: "Sent ping to ".concat(mention_1, ", available for ").concat(pingDuration_1, " minutes!"), ephemeral: true });
                });
            })["catch"](function () {
                interaction.reply({ content: 'Failed to fetch this channel!', ephemeral: true });
            });
        }
        return [2 /*return*/];
    });
}); });
client.login(process.env.BOT_TOKEN);
