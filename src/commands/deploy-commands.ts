import { REST, Routes, SlashCommandBuilder } from 'discord.js'
import { config } from 'dotenv-flow'

config()

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string)

const commands = [
    new SlashCommandBuilder()
        .setName('ucping')
        .setDescription('Sends an undercover ping!')
        .addStringOption(option => option.setName('mention')
            .setDescription('Mention level of ping')
            .setRequired(true)
            .addChoices(
                { name: 'everyone', value: 'everyone' },
                { name: 'here', value: 'here' }
            )
        )
        .addStringOption(option => option.setName('message')
            .setDescription('Message to send with ping')
            .setRequired(true)
        )
        .addNumberOption(option => option.setName('duration')
            .setDescription('Duration the ping should be available in minutes, default: 15 minutes')
        )
]

rest.put(Routes.applicationGuildCommands(process.env.BOT_APPLICATION_ID as string, process.env.BOT_GUILD_ID as string), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)