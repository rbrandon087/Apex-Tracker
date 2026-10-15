require('dotenv').config();
const API_URL = process.env.API_URL || 'http://localhost:3000';


const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'register') {
    const ign = interaction.options.getString('ign');
    const platform = interaction.options.getString('platform');
    const discordId = interaction.user.id;

    await interaction.deferReply();

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discordId, apexIgn: ign, platform }),
      });

      if (response.status === 201) {
        await interaction.editReply(`Registered ${ign}!`);
      } else if (response.status === 409) {
        await interaction.editReply('That player is already registered.');
      } else if (response.status === 404) {
        await interaction.editReply('No player was found. Check the spelling and platform. On PC, use your EA name.');
      } else {
        await interaction.editReply('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error('Register failed:', err);
      await interaction.editReply('Sorry about that, we are experiencing some issues. Please try again later.');
    }
  }

  if (interaction.commandName === 'rank') {
    const discordId = interaction.user.id;

    await interaction.deferReply();

    try {
      // Call A: find the user by Discord ID
      const userResponse = await fetch(`${API_URL}/users/discord/${discordId}`);

      if (userResponse.status === 404) {
        await interaction.editReply('Please use /register to register first.');
        return;
      }

      const user = await userResponse.json();

      // Call B: get their latest snapshot using the internal id
      const rankResponse = await fetch(`${API_URL}/users/${user.id}/rank-snapshots/latest`);

      if (rankResponse.status === 404) {
        await interaction.editReply("You're registered, but your rank hasn't been recorded yet. Please check back in a few minutes.");
        return;
      }

      const snapshot = await rankResponse.json();

      let rankText;
      if (snapshot.rank_division === null) {
        rankText = `${snapshot.rank_tier}`;
      } else {
        rankText = `${snapshot.rank_tier} ${snapshot.rank_division}`;
      }

      await interaction.editReply(`${user.apex_ign}: ${rankText} (${snapshot.rp} RP)`);
    } catch (err) {
      console.error('Rank failed:', err);
      await interaction.editReply('Sorry about that, we are experiencing some issues. Please try again later.');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);