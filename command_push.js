const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9'}).setToken("OTcyMTM5NDY2MDI4MzUxNTQ4.GljojJ.wMX3HkmTc0Ur_GOSNSdX_xLnTw8cF1b69P0ivE");

rest.put(Routes.applicationGuildCommands("972139466028351548", "971247570213036072"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);