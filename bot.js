require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if(!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);