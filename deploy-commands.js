require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register your Apex account with the bot')
    .addStringOption(option =>
      option.setName('ign').setDescription('Your Apex name').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Your platform')
        .setRequired(true)
        .addChoices(
          { name: 'PC', value: 'PC' },
          { name: 'PS5', value: 'PS4' },
          { name: 'XBOX', value: 'X1' }
        )
    ),
].map(command => command.toJSON());

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
    { body: commands }
  );
  console.log('Commands registered');
})();