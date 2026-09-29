const express = require('express');
const { addUser, addRankSnapshot, addLegendStat, addGuild, fetchUsers, fetchRankSnapshots, fetchLegendStats, fetchGuilds, fetchRankSnapshotsByUser } = require('./queries.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 
//POST endpoints for creating new resources
//create new user with discordId, apexIgn, and platform
server.post('/users', async (req, res) => {
  const { discordId, apexIgn, platform } = req.body;
  try {
    const user = await addUser(discordId, apexIgn, platform);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST endpoint for creating a new rank snapshot
//create new rank snapshot with userId, rankPoints, rankTier, and rankDivision
server.post('/rank-snapshots', async (req, res) => {
  const { userId, rankPoints, rankTier, rankDivision } = req.body;
  try {
    const rankSnapshot = await addRankSnapshot(userId, rankPoints, rankTier, rankDivision);
    res.status(201).json(rankSnapshot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//POST endpoint for creating a new legend stat
//create new legend stat with userId, legendName, kills, wins, and matchesPlayed
server.post('/legend-stats', async (req, res) => {
  const { userId, legendName, kills, wins, matchesPlayed } = req.body;
  try {
    const legendStat = await addLegendStat(userId, legendName, kills, wins, matchesPlayed);
    res.status(201).json(legendStat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//POST endpoint for creating a new guild
//create new guild with discordGuildId and optional notifyChannelId
 server.post('/guilds', async (req, res) => { 
  const { discordGuildId, notifyChannelId } = req.body;
  try {
    const guild = await addGuild(discordGuildId, notifyChannelId);
    res.status(201).json(guild);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET endpoints for fetching resources
//fetch all users
 server.get('/users' , async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all rank snapshots
//GET endpoint for fetching all rank snapshots
server.get('/rank-snapshots', async (req, res) => {
  try {
    const rankSnapshots = await fetchRankSnapshots();
    res.status(200).json(rankSnapshots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all legend stats
//GET endpoint for fetching all legend stats
server.get('/legend-stats', async (req, res) => {
  try {
    const legendStats = await fetchLegendStats();
    res.status(200).json(legendStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch all guilds
//fetch all guilds for a specific user
server.get('/guilds', async (req, res) => {
  try {
    const guilds = await fetchGuilds();
    res.status(200).json(guilds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET endpoint for fetching all rank snapshots by a specific user
//fetch all rank snapshots for a specific user
server.get('/users/:id/rank-snapshots', async (req, res) => {
  const { id } = req.params;
  try {
    const rankSnapshots = await fetchRankSnapshotsByUser(id);
    res.status(200).json(rankSnapshots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});