const express = require('express');
const { addUser, addRankSnapshot, addLegendStat, addGuild, fetchUsers, fetchRankSnapshots, fetchLegendStats, fetchGuilds } = require('./queries.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 
server.post('/users', async (req, res) => {
  const { discordId, apexIgn, platform } = req.body;
  
  try {
    const user = await addUser(discordId, apexIgn, platform);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.post('/rank-snapshots', async (req, res) => {
  const { userId, rankPoints, rankTier, rankDivision } = req.body;
  try {
    const rankSnapshot = await addRankSnapshot(userId, rankPoints, rankTier, rankDivision);
    res.status(201).json(rankSnapshot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.post('/legend-stats', async (req, res) => {
  const { userId, legendName, kills, wins, matchesPlayed } = req.body;
  try {
    const legendStat = await addLegendStat(userId, legendName, kills, wins, matchesPlayed);
    res.status(201).json(legendStat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 server.post('/guilds', async (req, res) => { 
  const { discordGuildId, notifyChannelId } = req.body;
  try {
    const guild = await addGuild(discordGuildId, notifyChannelId);
    res.status(201).json(guild);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


 server.get('/users' , async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get('/rank-snapshots', async (req, res) => {
  try {
    const rankSnapshots = await fetchRankSnapshots();
    res.status(200).json(rankSnapshots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get('/legend-stats', async (req, res) => {
  try {
    const legendStats = await fetchLegendStats();
    res.status(200).json(legendStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.get('/guilds', async (req, res) => {
  try {
    const guilds = await fetchGuilds();
    res.status(200).json(guilds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});