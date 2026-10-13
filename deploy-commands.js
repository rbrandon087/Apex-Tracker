require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
].map(command => command.toJSON());

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
    { body: commands }
  );
  console.log('Commands registered');
})();