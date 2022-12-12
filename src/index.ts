import {
    ActionRowBuilder,
    ButtonBuilder,
    Client,
    ButtonStyle,
    IntentsBitField,
    TextChannel,
    ComponentType
} from 'discord.js'
import { config } from 'dotenv-flow'

config()
const client = new Client({ intents: [ IntentsBitField.Flags.Guilds ] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    if (interaction.commandName === 'ucping') {
        const mention = interaction.options.get('mention')?.value
        const messageText = interaction.options.get('message')?.value
        let pingDuration = 15
        if (interaction.options.get('duration')) {
            pingDuration = interaction.options.get('duration').value as number
        }
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Click me to see ping!')
                    .setStyle(ButtonStyle.Primary)
            )
        interaction.client.channels.fetch(interaction.channelId).then((channel: TextChannel) => {
            channel.send({ content: `@${mention}`, components: [ row ] }).then((message) => {
                const collector = message.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 1000 * 60 * pingDuration
                })
                collector.on('collect', async i => {
                    i.reply({ content: `${messageText}`, ephemeral: true })
                })
                interaction.reply({ content: `Sent ping to ${mention}, available for ${pingDuration} minutes!`, ephemeral: true })
            })
        })
            .catch(() => {
                interaction.reply({ content: 'Failed to fetch this channel!', ephemeral: true })
            })
    }
})

client.login(process.env.BOT_TOKEN as string)